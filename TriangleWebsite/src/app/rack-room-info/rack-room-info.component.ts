import { Component, OnInit, Inject } from '@angular/core';
import { LatePlate } from "../models/late-plate";
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { AuthService } from "../services/auth.service";
import { AngularFireDatabase } from "angularfire2/database";

interface RackDialogData{
  firebasePath:string;
  isFree: boolean;
  initials: string;
  photoUrl: string;
  rackTime: string;
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

  constructor(private dialogRef: MdDialogRef<RackRoomInfoComponent>,
    @Inject(MD_DIALOG_DATA) private dialogData: RackDialogData, public authService: AuthService,
    private db: AngularFireDatabase) {}

  ngOnInit() {
    this.ownerInitials = this.dialogData.initials;
    this.ownerPhotoUrl = this.dialogData.photoUrl;
    this.firebasePath = this.dialogData.firebasePath;
    this.isFree = this.dialogData.isFree;
    this.rackTime = this.dialogData.rackTime;
    console.log(this.ownerInitials+ " "+this.ownerPhotoUrl+ " "+this.isFree+ " "+this.rackTime);
  }


    getStyle() {
    if(this.isFree){
      return "#b8e2ee";
      
    }
    return "#ff8a80";
  }

  remove(){
      firebase.database().ref('rack-tags/' + this.firebasePath).set({
        owner: "FREE",
        rackTime: ""
    });
  }
  
  claim(){
     firebase.database().ref('rack-tags/' + this.firebasePath).set({
        owner: this.authService._currentUserUid,
        rackTime: ""
    });
  }

}
