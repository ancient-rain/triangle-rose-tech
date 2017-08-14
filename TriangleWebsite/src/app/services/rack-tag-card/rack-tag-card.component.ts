import { Component, OnInit, Input } from '@angular/core';
import { RackTag } from "../../models/rack-tag";
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { AuthService } from "../auth.service";
import { MdSnackBar } from "@angular/material";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-rack-tag-card',
  templateUrl: './rack-tag-card.component.html',
  styleUrls: ['./rack-tag-card.component.scss']
})
export class RackTagCardComponent implements OnInit {
  @Input() time: string;

  readonly rackPath = `rack/${this.time}`;

  private _rackStream: FirebaseListObservable<RackTag[]>;
  private morning = new Date();
  private currentTime = new Date();
  private displayAdd: boolean;
  private canAdd: boolean;

  constructor(public authService: AuthService,
    public db: AngularFireDatabase,
    private snackbar: MdSnackBar) {
    this.morning.setHours(8, 15, 0, 0);

    if (this.currentTime > this.morning) {
      console.log('reset day');
      // firebase.database().ref(this.rackPath).remove();
      // this.morning = new Date();
      // this.morning.setHours(32, 0, 0, 0);
    }

    this._rackStream = this.db.list(this.rackPath);

    firebase.database().ref(this.rackPath).on('value',
      (snapshot: firebase.database.DataSnapshot) => {
        if (this.authService.rack !== '') {
          this.displayAdd = true;
          if (this.authService.rackTime === '') {
            this.canAdd = true;
            console.log('display add for all times');
          } else {            
            if (this.authService.rackTime === this.time) {
              this.displayAdd = true;
              console.log('display add for', this.time);
            } else {
              this.displayAdd = false;
            }
            this.canAdd = false;
          }
        } else {
          console.log('user not in rack room');
          this.displayAdd = false;
        }
      });
  }

  ngOnInit() {
  }

  add(): void {
    const initials: string = this.authService.initials;
    const photoUrl: string = this.authService.photoUrl;
    const rack: string = this.authService.rack;
    const uid: string = this.authService.userUid;
    const ref: string = this.rackPath + '/' + uid;

    firebase.database().ref(ref).child('initials').set(initials);
    firebase.database().ref(ref).child('photoUrl').set(photoUrl);
    firebase.database().ref(ref).child('rack').set(rack);

    firebase.database().ref(`members/${uid}`).child('rackTime').set(this.time);

    this.canAdd = false;
    this.snackbar.open('Added rack tag to ' + this.time, 'Dismiss', {
      duration: 5000,
    });
  }

  remove(): void {
    const uid: string = this.authService.userUid;
    const ref: string = this.rackPath + '/' + uid;

    firebase.database().ref(ref).remove();

    this.canAdd = true;
    this.snackbar.open('Removed rack tag from ' + this.time, 'Dismiss', {
      duration: 5000,
    });
  }
}
