import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Car } from 'src/app/shared/car.model';
import { CarsService } from 'src/app/core/cars.service';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.css']
})
export class CarItemComponent implements OnInit {
  @Input() car: Car;
  @Input() index: number;

  constructor(
    private carService: CarsService,
    private dataService: DataService
    ) { }

  ngOnInit() {
  }

  onEditCar() { 
    this.carService.startedEditing.next(this.index);
    console.log(this.index);
  }

  onDeleteCar() {
    this.carService.deleteCar(this.index);
    this.dataService.storeCars();
  }

}
