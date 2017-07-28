import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { Event } from "../models/event";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { MdDialog } from "@angular/material";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
