import { Injectable } from "@angular/core";
import { Car } from '../shared/car.model';
import { Subject } from 'rxjs';

@Injectable()

export class CarsService {
    cars: Car[] = [];
    carsChanged = new Subject<Car[]>();

    addCar(car: Car) {
        this.cars.push(car);
        this.carsChanged.next(this.cars.slice());
        console.log(this.cars);
        console.log(this.carsChanged);
    }

    deleteCar(index: number) {
        this.cars.splice(index, 1);
        this.carsChanged.next(this.cars.slice());
    }
    
}
