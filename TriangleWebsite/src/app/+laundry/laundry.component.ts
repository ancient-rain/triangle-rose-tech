import { Component, OnInit } from '@angular/core';
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

  private _washersStream: Washer[] = [];

  private _washerOne: Washer = new Washer();
  private _washerTwo: Washer = new Washer();

  constructor() {
    firebase.database().ref('laundry/washers/washerOne').on('value',
      (snapshot: firebase.database.DataSnapshot) => {
        this._washerOne.imageUrl = snapshot.child('imageUrl').val();
        this._washerOne.time = snapshot.child('time').val();
        this._washerOne.user = snapshot.child('user').val();
        this._washerOne.machine = 'washerOne';
        this._washerOne.isUsed = this._washerOne.user !== '';
      });

    firebase.database().ref('laundry/washers/washerTwo').on('value',
      (snapshot: firebase.database.DataSnapshot) => {
        this._washerTwo.imageUrl = snapshot.child('imageUrl').val();
        this._washerTwo.time = snapshot.child('time').val();
        this._washerTwo.user = snapshot.child('user').val();
        this._washerTwo.machine = 'washerTwo';
        this._washerTwo.isUsed = this._washerTwo.user !== '';
      });

    this._washersStream.push(this._washerOne);
    this._washersStream.push(this._washerTwo);


    console.log(this._washersStream);
  }

  ngOnInit() {
  }

}
