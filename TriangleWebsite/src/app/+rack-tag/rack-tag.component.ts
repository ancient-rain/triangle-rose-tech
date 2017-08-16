import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { MdDialog, MdDialogConfig } from '@angular/material';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { RackTag } from "../models/rack-tag";

import * as firebase from 'firebase/app';
import { RackRoomInfoComponent } from "../rack-room-info/rack-room-info.component";

@Component({
  selector: 'app-rack-tag',
  templateUrl: './rack-tag.component.html',
  styleUrls: ['./rack-tag.component.scss']
})
export class RackTagComponent implements OnInit {
  
  rackStream: FirebaseListObservable<RackTag[]>;
  isUpstairs: boolean;
  readonly rackPath = 'rack-tags';

  constructor(public authService: AuthService, private db: AngularFireDatabase, private dialog: MdDialog){
    this.rackStream = this.db.list(this.rackPath);
    this.isUpstairs = true;
  }

   get numColumns(): number{
    if(window.innerWidth < 500){
      return 1;
    }else if(window.innerWidth < 900){
      return 2;
    }
    else if(window.innerWidth < 1300){
      return 3;
    }
    else{
      return 4;
    }
  }

  ngOnInit() {}
  
  changeStairs(){
    console.log(this.rackStream);
    this.isUpstairs = !this.isUpstairs
  }

}
