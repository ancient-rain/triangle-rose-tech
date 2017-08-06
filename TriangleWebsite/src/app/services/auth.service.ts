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
  _currentUserUid: string;
  showLoginError: boolean;

  constructor(private afAuth: AngularFireAuth,
    private router: Router) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        firebase.database().ref(`/members/${user.uid}`).on('value',
          (snapshot: firebase.database.DataSnapshot) => {
            if (snapshot.val()) {
              console.log('Triangle member');
              console.log('signed in as', user);
              this._currentUserUid = user.uid;
              this.router.navigate(['']);
              this.showLoginError = false;
            } else {
              console.log('Non Triangle Member');
              this._currentUserUid = '';
              this.showLoginError = true;
              this.afAuth.auth.signOut();
            }
          });
      } else {
        console.log('not signed in');
        this._currentUserUid = '';
      }
    });

    this.isSignedInStream = this.afAuth.authState
      .map<firebase.User, boolean>((user: firebase.User) => {
        return user != null;
      });
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
}
