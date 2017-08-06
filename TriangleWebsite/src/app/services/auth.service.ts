import 'rosefire';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  isSignedInStream: Observable<boolean>;
  showLoginError: boolean;
  _currentUserUid: string;
  _currentUserPhoto: string;
  _currentUserRack: string;
  _currentUserRole: string;

  constructor(private afAuth: AngularFireAuth,
    private router: Router) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        firebase.database().ref(`/members/${user.uid}`).on('value',
          (snapshot: firebase.database.DataSnapshot) => {
            if (snapshot.val()) {
              this._currentUserUid = user.uid;
              this._currentUserPhoto = snapshot.child('photo').val();
              this._currentUserRole = snapshot.child('role').val();
              this._currentUserRack = snapshot.child('rack').val();
              this.router.navigate(['']);
              this.showLoginError = false;
            } else {
              this._currentUserUid = '';
              this._currentUserPhoto = '';
              this._currentUserRack = '';
              this._currentUserRole = '';
              this.showLoginError = true;
              this.afAuth.auth.signOut();
            }
          });
      } else {
        this._currentUserUid = '';
      }
    });

    this.isSignedInStream = this.afAuth.authState
      .map<firebase.User, boolean>((user: firebase.User) => {
        return user != null;
      });
  }

  get userUid(): string {
    return this._currentUserUid;
  }

  get photoUrl(): string {
    return this._currentUserPhoto;
  }

  get rack(): string {
    if (this._currentUserRack === '') {
      return 'N/A';
    }
    return this._currentUserRack;
  }

  get role(): string {
    return this._currentUserRole;
  }

  signIn(): void {
    Rosefire.signIn(environment.rosefireRegistryToken, (error, rfUser: RosefireUser) => {
      if (error) {
        // User not logged in!
        console.error(error);
        return;
      }

      this.afAuth.auth.signInWithCustomToken(rfUser.token);
    });
  }

  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/signin']);
  }

  changeImage(): void {
    console.log('TODO: add dialog component to change image');
  }

  changeRack(): void {
    console.log('TODO: add dialog component to change rack');
  }
}
