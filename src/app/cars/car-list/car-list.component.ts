import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/core/cars.service';
import { Car } from 'src/app/shared/car.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Car[];
  subscription: Subscription;

  constructor(private carsService: CarsService) { }

  ngOnInit() {
    this.subscription = this.carsService.carsChanged
      .subscribe(
        (cars: Car[]) => {
          this.cars = cars;
        }        
      );
  }

}
