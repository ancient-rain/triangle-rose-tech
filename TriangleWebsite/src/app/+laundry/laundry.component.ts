import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from "angularfire2/database";
import { Washer } from "../models/washer";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-laundry',
  templateUrl: './laundry.component.html',
  styleUrls: ['../shared/common.scss', './laundry.component.scss']
})
export class LaundryComponent implements OnInit {
  readonly washersPath: 'laundry/washers';
  readonly dryersPath: 'laundry/dryers';

  private _washersStream: FirebaseListObservable<Washer[]>;

  private _washerOne: Washer = new Washer();
  private _washerTwo: Washer = new Washer();

  constructor() {
    var washerOnePath = this.washersPath + '/washerOne';
    var washerTwoPath = this.washersPath + '/washerTwo';

    firebase.database().ref(washerOnePath).on('value',
      (snapshot: firebase.database.DataSnapshot) => {
        this._washerOne.imageUrl = snapshot.child('imageUrl').val();
        this._washerOne.time = snapshot.child('time').val();
        this._washerOne.user = snapshot.child('user').val();
        this._washerOne.machine = 'washerOne';
      });

    firebase.database().ref(washerTwoPath).on('value',
      (snapshot: firebase.database.DataSnapshot) => {
        this._washerTwo.imageUrl = snapshot.child('imageUrl').val();
        this._washerTwo.time = snapshot.child('time').val();
        this._washerTwo.user = snapshot.child('user').val();
        this._washerTwo.machine = 'washerTwo';
      });
  }

  ngOnInit() {
  }

}
