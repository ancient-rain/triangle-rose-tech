import { Component, OnInit } from '@angular/core';
import { Washer } from "../models/washer";
import * as firebase from 'firebase/app';
import { Dryer } from "../models/dryer";

@Component({
  selector: 'app-laundry',
  templateUrl: './laundry.component.html',
  styleUrls: ['../shared/common.scss', './laundry.component.scss']
})
export class LaundryComponent implements OnInit {
  private _washersStream: Washer[] = [];
  private _dryersStream: Dryer[] = [];

  private _washerOne: Washer = new Washer();
  private _washerTwo: Washer = new Washer();
  private _dryerOne: Dryer = new Dryer();
  private _dryerTwo: Dryer = new Dryer();
  private _dryerThree: Dryer = new Dryer();

  constructor() {
    firebase.database().ref('laundry/washers/washerOne').on('value',
      (snapshot: firebase.database.DataSnapshot) => {
        this._washerOne.imageUrl = snapshot.child('imageUrl').val();
        this._washerOne.user = snapshot.child('user').val();
        this._washerOne.machine = 'washerOne';
        this._washerOne.isUsed = this._washerOne.user !== '';
      });

    firebase.database().ref('laundry/washers/washerTwo').on('value',
      (snapshot: firebase.database.DataSnapshot) => {
        this._washerTwo.imageUrl = snapshot.child('imageUrl').val();
        this._washerTwo.user = snapshot.child('user').val();
        this._washerTwo.machine = 'washerTwo';
        this._washerTwo.isUsed = this._washerTwo.user !== '';
      });

    firebase.database().ref('laundry/dryers/dryerOne').on('value',
      (snapshot: firebase.database.DataSnapshot) => {
        this._dryerOne.imageUrl = snapshot.child('imageUrl').val();
        this._dryerOne.user = snapshot.child('user').val();
        this._dryerOne.machine = 'washerTwo';
        this._dryerOne.isUsed = this._dryerOne.user !== '';
      });

    firebase.database().ref('laundry/dryers/dryerTwo').on('value',
      (snapshot: firebase.database.DataSnapshot) => {
        this._dryerTwo.imageUrl = snapshot.child('imageUrl').val();
        this._dryerTwo.user = snapshot.child('user').val();
        this._dryerTwo.machine = 'washerTwo';
        this._dryerTwo.isUsed = this._dryerTwo.user !== '';
      });

    firebase.database().ref('laundry/dryers/dryerThree').on('value',
      (snapshot: firebase.database.DataSnapshot) => {
        this._dryerThree.imageUrl = snapshot.child('imageUrl').val();
        this._dryerThree.user = snapshot.child('user').val();
        this._dryerThree.machine = 'washerTwo';
        this._dryerThree.isUsed = this._dryerThree.user !== '';
      });

    this._washersStream.push(this._washerOne);
    this._washersStream.push(this._washerTwo);

    this._dryersStream.push(this._dryerOne);
    this._dryersStream.push(this._dryerTwo);
    this._dryersStream.push(this._dryerThree);
  }

  ngOnInit() {
  }

}
