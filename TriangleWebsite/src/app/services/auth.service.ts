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
  isSignedIn: boolean = false;
  showLoginError: boolean;
  _currentUserUid: string;
  _currentUserInitials: string;
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
              this._currentUserInitials = snapshot.child('initials').val();
              this._currentUserPhoto = snapshot.child('photo').val();
              this._currentUserRole = snapshot.child('role').val();
              this._currentUserRack = snapshot.child('rack').val();
              this.showLoginError = false;
              this.isSignedIn = true;
            } else {
              this.showLoginError = true;
              this.isSignedIn = false;
              this.afAuth.auth.signOut();
            }
          });
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

  get initials(): string {
    return this._currentUserInitials;
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

      this.afAuth.auth.signInWithCustomToken(rfUser.token).then((authState) => {
         this.router.navigate(['']);
      });
    });
  }

  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/signin']);
    this.isSignedIn = false;
  }
}
