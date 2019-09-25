import { Component, OnInit, Input } from '@angular/core';
import { Car } from 'src/app/shared/car.model';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.css']
})
export class CarItemComponent implements OnInit {
  @Input() car: Car;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
