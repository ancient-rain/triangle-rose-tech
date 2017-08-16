import { Component, OnInit, Input } from '@angular/core';
import { LatePlate } from "../../models/late-plate";

@Component({
  selector: 'app-washer-icon',
  templateUrl: './washer-icon.component.html',
  styleUrls: ['./washer-icon.component.scss']
})
export class WasherIconComponent implements OnInit {
  @Input() latePlate: LatePlate;

  constructor() { }

  ngOnInit() {
  }
}
