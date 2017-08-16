import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogConfig, MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { MyEvent } from "../models/event";
import * as firebase from 'firebase';
import { AuthService } from "../services/auth.service";
import { AngularFireDatabase } from "angularfire2/database";

interface PostDialogData{
  event?: MyEvent;
}

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})

export class CreateEventComponent implements OnInit {
  title="Add an Event";
  formEvent : MyEvent;

  constructor(private dialogRef: MdDialogRef<CreateEventComponent>,
     @Inject(MD_DIALOG_DATA) private dialogData: PostDialogData, public authService: AuthService,
    private db: AngularFireDatabase) { 
       this.formEvent = new MyEvent();
      console.log("Recieved the data: ", dialogData);
    }
  
 ngOnInit() {
     if(this.dialogData.event){
       this.title = "Edit this post!"
      Object.assign(this.formEvent, this.dialogData.event);
    }
  }
  onSubmit(){
    try{
     const post = new MyEvent({
        date: this.formEvent.date,
        name: this.formEvent.name,
        location: this.formEvent.location,
        time: this.formEvent.time,
        authorKey: this.authService.userUid,
      });
     const firebaseRef = firebase.database().ref("events");
      if(this.dialogData.event){
          firebaseRef.child(this.dialogData.event.$key).set(post); 
      }
      else{
        firebaseRef.push(post);
      }
      console.log("Post should be in database now!", post);
      this.dialogRef.close();
    } catch(e){
      console.error("Submit Error", e);
    }
  }

}
