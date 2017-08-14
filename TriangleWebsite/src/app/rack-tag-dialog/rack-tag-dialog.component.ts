import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from "@angular/material";
import { RackTime } from "../models/rack-time";

@Component({
  selector: 'app-rack-tag-dialog',
  templateUrl: './rack-tag-dialog.component.html',
  styleUrls: ['./rack-tag-dialog.component.scss']
})
export class RackTagDialogComponent implements OnInit {
  private times = ['6:00 AM', '6:30 AM', '7:00 AM', '7:15 AM', '7:30 AM', '7:45 AM'];
  rackTime: string;

  constructor(private dialogRef: MdDialogRef<RackTagDialogComponent>) { }

  ngOnInit() {
  }

}
