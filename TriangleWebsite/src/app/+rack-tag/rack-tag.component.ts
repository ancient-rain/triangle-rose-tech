import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { RackTime } from "../models/rack-time";
import { MdDialog } from "@angular/material";
import { RackTagDialogComponent } from "../rack-tag-dialog/rack-tag-dialog.component";

@Component({
  selector: 'app-rack-tag',
  templateUrl: './rack-tag.component.html',
  styleUrls: ['../shared/common.scss', './rack-tag.component.scss']
})
export class RackTagComponent implements OnInit {
  _timesStream: RackTime[] = [];
  six: RackTime = new RackTime();
  sixThirty: RackTime = new RackTime();
  seven: RackTime = new RackTime();
  sevenFifteen: RackTime = new RackTime();
  sevenThirty: RackTime = new RackTime();
  sevenFourtyFive: RackTime = new RackTime();

  constructor(private dialog: MdDialog) {
    this.six.time = '6:00 AM';
    this.six.wordTime =  'six';

    this.sixThirty.time = '6:30 AM';
    this.sixThirty.wordTime =  'sixThirty';

    this.seven.time = '7:00 AM';
    this.seven.wordTime =  'seven';

    this.sevenFifteen.time = '7:15 AM';
    this.sevenFifteen.wordTime =  'sevenFifteen';

    this.sevenThirty.time = '7:30 AM';
    this.sevenThirty.wordTime =  'sevenThirty';

    this.sevenFourtyFive.time = '7:45 AM';
    this.sevenFourtyFive.wordTime =  'sevenFourtyFive';

    this._timesStream.push(this.six);
    this._timesStream.push(this.sixThirty);
    this._timesStream.push(this.seven);
    this._timesStream.push(this.sevenFifteen);
    this._timesStream.push(this.sevenThirty);
    this._timesStream.push(this.sevenFourtyFive);
  }

  ngOnInit() {
  }

  showRackTagDialog(): void {
    this.dialog.open(RackTagDialogComponent);
  }
}
