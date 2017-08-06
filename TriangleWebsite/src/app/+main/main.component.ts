import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['../shared/common.scss', './main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
