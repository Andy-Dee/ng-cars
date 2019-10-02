import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { CarsService } from './cars.service';
import { Car } from '../shared/car.model';

@Injectable()

export class DataService {
    baseUrl: string = 'assets/data/';    

    constructor(
        private http: HttpClient,
        private carsService: CarsService
        ) {}

    private handleErrorObservable (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    } 

    fetchOrders() : Observable<any> {
        return this.http
            .get<any>(this.baseUrl + 'products.json')
            .pipe(
                map(res => res),
                catchError(this.handleErrorObservable)
            )
    }  
    
    fetchBalances() : Observable<any> {
        return this.http
            .get<any>(this.baseUrl + 'balance.json')
            .pipe(
                map(res => res),
                catchError(this.handleErrorObservable)
            )
    }

    fetchBills() : Observable<any> {
        return this.http
            .get<any>(this.baseUrl + 'bills.json')
            .pipe(
                map(res => res),
                catchError(this.handleErrorObservable)
            )
    }

    fetchSales() : Observable<any> {
        return this.http
            .get<any>(this.baseUrl + 'sales.json')
            .pipe(
                map(res => res),
                catchError(this.handleErrorObservable)
            )
    }

    fetchCars() : Observable<any> {
        return this.http
            .get<any>(this.baseUrl + 'cars.json')
            .pipe(
                map(res => res),
                catchError(this.handleErrorObservable)
            )
    }

    storeCars() {
        const cars = this.carsService.getCars();
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.http.put('https://andy-cars.firebaseio.com/store-cars.json', cars, {headers})
                 .subscribe(
                     response => {
                         console.log(response);
                     }
                 )
    }

    loadCars() {
       return this.http
        .get<Car[]>('https://andy-cars.firebaseio.com/store-cars.json')
        .pipe(
            tap(cars => {
                this.carsService.setCars(cars);
            })
        );
    }
    
}