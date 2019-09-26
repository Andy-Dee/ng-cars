import { Injectable } from "@angular/core";
import { Car } from '../shared/car.model';
import { Subject } from 'rxjs';

@Injectable()

export class CarsService {
    cars: Car[] = [];
    carsChanged = new Subject<Car[]>();
    startedEditing = new Subject<number>();

    addCar(car: Car) {
        this.cars.push(car);
        this.carsChanged.next(this.cars.slice());
        console.log(this.cars);
        console.log(this.carsChanged);
    }

    getCar(index: number) {
        return this.cars[index];
    }

    editCar(index: number, newCar: Car) {
        this.cars[index] = newCar;
        this.carsChanged.next(this.cars.slice());
        console.log(newCar);
    }

    deleteCar(index: number) {
        this.cars.splice(index, 1);
        this.carsChanged.next(this.cars.slice());
    }
    
}
