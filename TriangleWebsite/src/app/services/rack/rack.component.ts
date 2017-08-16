import { Component, OnInit, Input } from '@angular/core';
import { RackTag } from "../../models/rack-tag";
import { AuthService } from "../auth.service";
import { MdDialogConfig, MdDialog } from "@angular/material";
import { RackRoomInfoComponent } from "../../rack-room-info/rack-room-info.component";
import { LatePlate } from "../../models/late-plate";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-rack',
  templateUrl: './rack.component.html',
  styleUrls: ['./rack.component.scss']
})
export class RackComponent implements OnInit {
  @Input() rack: RackTag;
  firebasePath: string;
  isFree: boolean;
  myOwnerInitials: string;
  myOwnerPhoto: string;
  rackTime: string;

  constructor(public authService: AuthService, private dialog: MdDialog) { 
  }

  ngOnInit() {
    this.firebasePath = this.rack.$key;
    this.isFree = (this.rack.owner=="FREE");
    const ownerPhotoRef = firebase.database().ref('members/' +this.rack.owner);
    ownerPhotoRef.once('value').then((snapshot) =>{
       this.myOwnerInitials = (snapshot.val() && snapshot.val().initials) || '';
       this.myOwnerPhoto = (snapshot.val() && snapshot.val().photo) || '';
       this.rackTime = (snapshot.val() && snapshot.val().rackTime) || '';
    });
  }

  openRackDialog(){
    console.log("show dialog");
    const dialogConfig = new MdDialogConfig();
    dialogConfig.data = {firebasePath: this.firebasePath,isFree: this.isFree,
                          photoUrl: this.myOwnerPhoto, initials: this.myOwnerInitials, rackTime: this.rackTime};
    this.dialog.open( RackRoomInfoComponent, dialogConfig);
  }

    getStyle() {
    if(this.isFree){
      return "#b8e2ee";
      
    }
    return "#ff8a80";
  }

}
