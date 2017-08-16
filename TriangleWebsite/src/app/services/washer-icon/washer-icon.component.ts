import { Component, OnInit, Input } from '@angular/core';
import { Washer } from "../../models/washer";

@Component({
  selector: 'app-washer-icon',
  templateUrl: './washer-icon.component.html',
  styleUrls: ['./washer-icon.component.scss']
})
export class WasherIconComponent implements OnInit {
  @Input() washer: Washer;

  constructor() { }

  ngOnInit() {
  }
}
