import { Component, OnInit, Input } from '@angular/core';
import { RackTag } from "../../models/rack-tag";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-rack',
  templateUrl: './rack.component.html',
  styleUrls: ['./rack.component.scss']
})
export class RackComponent implements OnInit {
  @Input() rack: RackTag; 

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
