import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { Subscription } from "rxjs/Subscription";
import { FirebaseObjectObservable } from "angularfire2/database";
import { Router } from "@angular/router";
import { AuthService } from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  showMenu = false;
  private user: FirebaseObjectObservable<any>;
  private authStateSubscription: Subscription;

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    public authService: AuthService) {
  }

  ngOnInit(): void {
  //   var validUser = false;

  //   this.authStateSubscription = this.afAuth.authState.subscribe((user: firebase.User) => {
  //     if (user) {
  //       // verify Triangle Member
  //       firebase.database().ref('/members/' + user.uid).once('value')
  //         .then(function (snapshot) {
  //           validUser = snapshot.exists();
  //         });
  //     } else {
  //       validUser = false;
  //     }

  //     // need a way to do this in the script above
  //     // for now this works fine
  //     setTimeout(() => {
  //       if (validUser) {
  //         this.router.navigate(['']);
  //       }
  //     }, 3000)
  // });
}

ngOnDestroy(): void {
  this.authStateSubscription.unsubscribe();
}

signOut(): void {
  this.afAuth.auth.signOut();
  this.router.navigate(['/signin']);
}
}
