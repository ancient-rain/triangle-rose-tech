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

  constructor(private afAuth: AngularFireAuth,
    private router: Router) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        console.log('signed in as', user);
        this._currentUserUid = user.uid;
        this.router.navigate(['']);
        // console.log(firebase.database().ref(`/members/`).once('value')
        //   .then(function(snapshot) {
        //     return snapshot.exists();
        //   }));
      } else {
        console.log('not signed in');
        this._currentUserUid = '';
      }
    });

    this.isSignedInStream = this.afAuth.authState
      .map<firebase.User, boolean>((user: firebase.User) => { 
          // return firebase.database().ref('/members/' + this._currentUserUid).once('value')
          //   .then(function(snapshot) {
          //     return snapshot.exists();
          //   }
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
