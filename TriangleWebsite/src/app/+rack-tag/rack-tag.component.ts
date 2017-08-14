import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-rack-tag',
  templateUrl: './rack-tag.component.html',
  styleUrls: ['../shared/common.scss', './rack-tag.component.scss']
})
export class RackTagComponent implements OnInit {
  _timesStream: string[] = [];

  constructor() {
    this._timesStream.push('6:00 AM');
    this._timesStream.push('6:30 AM');
    this._timesStream.push('7:00 AM');
    this._timesStream.push('7:15 AM');
    this._timesStream.push('7:30 AM');
    this._timesStream.push('7:45 AM');
  }

  ngOnInit() {
  }

}
