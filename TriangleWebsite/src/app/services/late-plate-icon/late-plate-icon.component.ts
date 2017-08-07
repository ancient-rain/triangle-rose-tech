import { Component, OnInit, Input } from '@angular/core';
import { LatePlate } from "../../models/late-plate";

@Component({
  selector: 'app-late-plate-icon',
  templateUrl: './late-plate-icon.component.html',
  styleUrls: ['./late-plate-icon.component.scss']
})
export class LatePlateIconComponent implements OnInit {
  @Input() latePlate: LatePlate;

  constructor() { }

  ngOnInit() {
  }
}
