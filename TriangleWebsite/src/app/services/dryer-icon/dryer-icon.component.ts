import { Component, OnInit, Input } from '@angular/core';
import { Dryer } from "../../models/dryer";
import { AuthService } from "../auth.service";
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-dryer-icon',
  templateUrl: './dryer-icon.component.html',
  styleUrls: ['./dryer-icon.component.scss']
})
export class DryerrIconComponent implements OnInit {
  @Input() dryer: Dryer;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  add(): void {
    const ref: string = 'laundry/dryers/' + this.dryer.machine;

    this.dryer.imageUrl = this.authService.photoUrl;
    this.dryer.user = this.authService.initials;
    this.dryer.isUsed = true;

    firebase.database().ref(ref).child('/imageUrl')
      .set(this.authService.photoUrl);

    firebase.database().ref(ref).child('user')
      .set(this.authService.initials);
  }

  remove(): void {
    const ref: string = 'laundry/dryers/' + this.dryer.machine;

    if (this.authService.initials === this.dryer.user) {
      this.dryer.imageUrl = '';
      this.dryer.user = '';
      this.dryer.isUsed = false;

      firebase.database().ref(ref).child('/imageUrl').set('');
      firebase.database().ref(ref).child('user').set('');
    }
  }
}
