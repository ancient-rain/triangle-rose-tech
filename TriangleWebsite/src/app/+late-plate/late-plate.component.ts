import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { LatePlate } from "../models/late-plate";
import * as firebase from 'firebase/app';

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
    public db: AngularFireDatabase) {
    this._latePlatesStream = this.db.list(this.latePlatesPath);
    firebase.database().ref(this.latePlatesPath).on('value',
      (snapshot: firebase.database.DataSnapshot) => {
        if (snapshot.child(this.authService.userUid).val()) {
          this.displayAdd = false;
          console.log('display remove');
        } else {
          this.displayAdd = true;
          console.log('display add');
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
}
