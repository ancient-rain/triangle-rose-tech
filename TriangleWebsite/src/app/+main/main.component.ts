import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { UploadProfilePicComponent } from "../upload-profile-pic/upload-profile-pic.component";
import { MdDialogConfig, MdDialog } from "@angular/material";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['../shared/common.scss', './main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public authService: AuthService, private dialog: MdDialog) { }

  ngOnInit() {
  }

  uploadProfilePic(){
    console.log("show upload profile pic dialog");
    const dialogConfig = new MdDialogConfig();
    this.dialog.open( UploadProfilePicComponent, dialogConfig);
  }

}
