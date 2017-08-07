import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from "../auth.service";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import * as firebase from 'firebase/app';
import { LatePlate } from "../../models/late-plate";

@Component({
  selector: 'app-late-plate-icon',
  templateUrl: './late-plate-icon.component.html',
  styleUrls: ['./late-plate-icon.component.scss']
})
export class LatePlateIconComponent implements OnInit {
  @Input() latePlate: LatePlate;
  readonly latePlatesPath = 'late-plates';

  private _latePlatesStream: FirebaseListObservable<LatePlate[]>;
  private displayAdd: boolean;

  constructor(public authService: AuthService,
    public db: AngularFireDatabase) {
    this._latePlatesStream = this.db.list(this.latePlatesPath);
    firebase.database().ref(this.latePlatesPath).on('value',
      (snapshot: firebase.database.DataSnapshot) => {
        if (snapshot.child(this.authService.userUid).val()) {
          this.displayAdd = false;
          console.log('display remove');
        } else {
          this.displayAdd = true;
          console.log('display add');
        }
      });
  }

  ngOnInit() {
  }

  add(): void {
    const latePlate: LatePlate = new LatePlate();
    latePlate.key = this.authService.userUid;
    latePlate.initials = this.authService.initials;
    latePlate.photoUrl = this.authService.photoUrl;
    console.log(latePlate);
    firebase.database().ref(this.latePlatesPath).push(latePlate);
    this.displayAdd = false;
  }

  remove(): void {
    firebase.database().ref()
  }
}
