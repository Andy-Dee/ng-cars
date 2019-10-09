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

  constructor(
    private carService: CarsService
    ) {}

  ngOnInit() {}

  onEditCar(id: any) { 
    this.carService.startedEditing.next(id);
    console.log(id);
  }

  onDeleteCar(id: any) {
    this.carService.deleteCar(id);
    console.log(id);
  }

}
