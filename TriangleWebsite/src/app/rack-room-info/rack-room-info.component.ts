import { Component, OnInit, Inject } from '@angular/core';
import { LatePlate } from "../models/late-plate";
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { AuthService } from "../services/auth.service";
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase/app';

interface RackDialogData{
  firebasePath:string;
  isFree: boolean;
  initials: string;
  photoUrl: string;
  rackTime: string;
  isUpstairs:boolean;
  alreadyHaveRack: boolean;
}

@Component({
  selector: 'app-rack-room-info',
  templateUrl: './rack-room-info.component.html',
  styleUrls: ['./rack-room-info.component.scss']
})
export class RackRoomInfoComponent implements OnInit {
  ownerPhotoUrl: string;
  ownerInitials: string;
  firebasePath: string;
  isFree: boolean;
  rackTime: string;
  isUpstairs:boolean;
  alreadyHaveRack:boolean;

  constructor(private dialogRef: MdDialogRef<RackRoomInfoComponent>,
    @Inject(MD_DIALOG_DATA) private dialogData: RackDialogData, public authService: AuthService,
    private db: AngularFireDatabase) {}

  ngOnInit() {
    this.ownerInitials = this.dialogData.initials;
    this.ownerPhotoUrl = this.dialogData.photoUrl;
    this.firebasePath = this.dialogData.firebasePath;
    this.isFree = this.dialogData.isFree;
    this.rackTime = this.dialogData.rackTime;
    this.isUpstairs = this.dialogData.isUpstairs;
    this.alreadyHaveRack = this.dialogData.alreadyHaveRack;
    console.log(this.ownerInitials+ " "+this.ownerPhotoUrl+ " "+this.isFree+ " "+this.rackTime);
  }


    getStyle() {
    if(this.isFree){
      return "#b8e2ee";
      
    }
    return "#ff8a80";
  }

  remove(){
      if(this.isUpstairs){
        firebase.database().ref('rack-tags/Upstairs/' + this.firebasePath).set({
          owner: "FREE",
          rackTime: ""
        });
      }
      else{
          firebase.database().ref('rack-tags/Downstairs/' + this.firebasePath).set({
          owner: "FREE",
          rackTime: ""
        });
      }
    firebase.database().ref('members/'+this.authService.userUid).child("rack").set("");
    this.dialogRef.close();
  }

  changeRackTime(){
    if(this.isUpstairs){
        firebase.database().ref('rack-tags/Upstairs/' + this.firebasePath).set({
          owner: this.authService._currentUserUid,
          rackTime: this.rackTime
        });
      }
      else{
        firebase.database().ref('rack-tags/Downstairs/' + this.firebasePath).set({
          owner: this.authService._currentUserUid,
          rackTime: this.rackTime
        });

      }
    firebase.database().ref('members/'+this.authService.userUid).child("rack").set(this.firebasePath);
    this.dialogRef.close();
  }
  
  claim(){
    if(this.isUpstairs){
      firebase.database().ref('rack-tags/Upstairs/' + this.firebasePath).set({
        owner: this.authService._currentUserUid,
        rackTime: this.rackTime
     });
    }
    else{
        firebase.database().ref('rack-tags/Downstairs/' + this.firebasePath).set({
        owner: this.authService._currentUserUid,
        rackTime: this.rackTime
     });
    }
    firebase.database().ref('members/'+this.authService.userUid).child("rack").set(this.firebasePath);
    this.dialogRef.close();
  }

}
