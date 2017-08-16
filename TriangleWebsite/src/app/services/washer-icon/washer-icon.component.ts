import { Component, OnInit, Input } from '@angular/core';
import { Washer } from "../../models/washer";
import { AuthService } from "../auth.service";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-washer-icon',
  templateUrl: './washer-icon.component.html',
  styleUrls: ['./washer-icon.component.scss']
})
export class WasherIconComponent implements OnInit {
  @Input() washer: Washer;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  add(): void {
    const ref: string = 'laundry/washers/' + this.washer.machine;

    this.washer.imageUrl = this.authService.photoUrl;
    this.washer.user = this.authService.initials;
    this.washer.isUsed = true;

    firebase.database().ref(ref).child('/imageUrl')
      .set(this.authService.photoUrl);

    firebase.database().ref(ref).child('user')
      .set(this.authService.initials);
  }

  remove(): void {
    const ref: string = 'laundry/washers/' + this.washer.machine;

    if (this.authService.initials === this.washer.user) {
      this.washer.imageUrl = '';
      this.washer.user = '';
      this.washer.isUsed = false;

      firebase.database().ref(ref).child('/imageUrl').set('');
      firebase.database().ref(ref).child('user').set('');
    }
  }
}
