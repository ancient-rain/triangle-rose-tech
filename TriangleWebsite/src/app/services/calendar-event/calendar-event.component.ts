import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase';
import { MdDialogConfig, MdSnackBar, MdDialog } from "@angular/material";
import { CreateEventComponent } from "../../create-event/create-event.component";
import { MyEvent } from "../../models/event";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-calendar-event',
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.scss']
})
export class CalendarEventComponent implements OnInit {

  @Input() event: MyEvent; 
  isExpanded= false;

  constructor(private snackBar : MdSnackBar, private dialog: MdDialog, public authService: AuthService){}

  ngOnInit() {
  }

  edit(): void{
    console.log("Edit");
    const dialogConfig = new MdDialogConfig();
    dialogConfig.data= {
      event: this.event,
    }
    this.dialog.open(CreateEventComponent, dialogConfig);
  }

  delete(): void{
    console.log("Delete");
    firebase.database().ref("events").child(this.event.$key).remove();
    this.snackBar.open("Event Removed from Calendar", "Dismiss",{
      duration: 3000,
    });
  }
}