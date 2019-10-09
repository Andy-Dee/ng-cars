import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarsService } from 'src/app/core/cars.service';
import { Car } from 'src/app/shared/car.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit, OnDestroy {
  cars: Car[] = [];
  subscriptionCars: Subscription

  constructor(
    private carsService: CarsService
    ) {}

  ngOnInit() {
    this.subscriptionCars = this.carsService.getCars().subscribe(
      action => {
        this.cars = action.map(
          item => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            } as Car;
          }
        )
      }
    )
  }

  ngOnDestroy() {
    this.subscriptionCars.unsubscribe();
  }

}
