import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase/app';
import { LatePlate } from "../models/late-plate";
import { MdSnackBar } from "@angular/material";

@Component({
  selector: 'app-late-plate',
  templateUrl: './late-plate.component.html',
  styleUrls: ['../shared/common.scss', './late-plate.component.scss']
})
export class LatePlateComponent implements OnInit {
  readonly latePlatesPath = 'late-plates';

  private _latePlatesStream: FirebaseListObservable<LatePlate[]>;
  private displayAdd: boolean;

  constructor(public authService: AuthService,
    public db: AngularFireDatabase,
    private snackBar: MdSnackBar) {
    this._latePlatesStream = this.db.list(this.latePlatesPath);
    firebase.database().ref(this.latePlatesPath).on('value',
      (snapshot: firebase.database.DataSnapshot) => {
        if (snapshot.child(this.authService.userUid).val()) {
          this.displayAdd = false;
        } else {
          this.displayAdd = true;
        }
      });
  }

  ngOnInit() {
  }

  get numColumns(): number {
    if (window.innerWidth < 400) {
      return 2;
    } else if (window.innerWidth < 700) {
      return 3;
    } else if (window.innerWidth < 1000) {
      return 4;
    } else if (window.innerWidth < 1300) {
      return 5;
    } else {
      return 6;
    }
  }

  add(): void {
    const uid: string = this.authService.userUid;
    const initials: string = this.authService.initials;
    const photoUrl: string = this.authService.photoUrl;
    const ref: string = this.latePlatesPath + '/' + uid;
    firebase.database().ref(ref).child('initials').set(initials);
    firebase.database().ref(ref).child('photoUrl').set(photoUrl);
    this.displayAdd = false;
    this.snackBar.open('Late Plate added', 'Dismiss', {
      duration: 5000,
    });
  }

  remove(): void {
    const uid: string = this.authService.userUid;
    const ref: string = this.latePlatesPath + '/' + uid;
    firebase.database().ref(ref).remove();
    this.displayAdd = true;
    this.snackBar.open('Late Plate removed', 'Dismiss', {
      duration: 5000,
    });
  }
}
