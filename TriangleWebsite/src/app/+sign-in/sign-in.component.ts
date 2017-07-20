import 'rosefire';
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { environment } from "../../environments/environment";
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(public authService: AuthService,
  public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  signIn(): void {
    Rosefire.signIn(environment.rosefireRegistryToken, (error, rfUser: RosefireUser) => {
      if (error) {
        // User not logged in!
        console.error(error);
        return;
      }
      console.log('Rosefire is done. User:', rfUser);
      this.afAuth.auth.signInWithCustomToken(rfUser.token);
    });
  }

}
