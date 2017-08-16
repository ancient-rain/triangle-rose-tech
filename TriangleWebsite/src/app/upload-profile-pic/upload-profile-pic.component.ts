import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from "@angular/material";
import { AuthService } from "../services/auth.service";
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase';

@Component({
  selector: 'app-upload-profile-pic',
  templateUrl: './upload-profile-pic.component.html',
  styleUrls: ['./upload-profile-pic.component.scss']
})
export class UploadProfilePicComponent implements OnInit {

  photoUrl: string;

  constructor(private dialogRef: MdDialogRef<UploadProfilePicComponent>,
     public authService: AuthService, private db: AngularFireDatabase) { }

  ngOnInit() {
  }

    featuredPhotoSelected(event : any, photoName: string){
    const file: File = event.target.files[0];
    console.log("Selected file: ", file.name);
    const metaData = {'contentType': file.type};

    const storageRef: firebase.storage.Reference = 
    firebase.storage().ref().child(`/members/${this.authService}/${photoName}`);

    const uploadTask: firebase.storage.UploadTask = storageRef.put(file, metaData);
    console.log("Uploading file: ", file.name);
    uploadTask.then( (uploadSnapshot: firebase.storage.UploadTaskSnapshot) => { 
        console.log("Upload is complete", uploadSnapshot.downloadURL);
        this.photoUrl = uploadSnapshot.downloadURL;
     });
  }
  
  onUpload(){
    firebase.database().ref('members/'+this.authService.userUid).child("photo").set(this.photoUrl);
    this.dialogRef.close();
  }

}
