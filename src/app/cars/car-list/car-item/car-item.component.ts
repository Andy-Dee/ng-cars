import { Component, OnInit, Input } from '@angular/core';
import { Car } from 'src/app/shared/car.model';
import { CarsService } from 'src/app/core/cars.service';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.css']
})
export class CarItemComponent implements OnInit {
  @Input() car: Car;
  @Input() index: number;
  id: number;

  constructor(private carService: CarsService) { }

  ngOnInit() {
  }

  onDeleteCar() {
    this.carService.deleteCar(this.id);
  }

}
