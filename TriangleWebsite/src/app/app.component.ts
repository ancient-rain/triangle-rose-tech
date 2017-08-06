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

  ngOnInit(): void { }

ngOnDestroy(): void {
  this.authStateSubscription.unsubscribe();
}

signOut(): void {
  this.afAuth.auth.signOut();
  this.router.navigate(['/signin']);
}
}
