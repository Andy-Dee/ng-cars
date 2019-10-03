import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap, take, exhaustMap } from 'rxjs/operators';
import { CarsService } from './cars.service';
import { Car } from '../shared/car.model';
import { AuthService } from '../auth/auth.service';

@Injectable()

export class DataService {
    baseUrl: string = 'assets/data/';    

    constructor(
        private http: HttpClient,
        private carsService: CarsService,
        private authService: AuthService
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
        this.authService.user
            .pipe(
                take(1),
                exhaustMap(
                    user => {
                        return this.http.put<Car[]>('https://andy-cars.firebaseio.com/store-cars.json', cars, {
                            params: new HttpParams().set('auth', user.token)
                        })
                    }
                )
            )
        
    }

    loadCars() {
        return this.authService.user
            .pipe(
                take(1),
                exhaustMap(
                    user => {
                        return this.http.get<Car[]>('https://andy-cars.firebaseio.com/store-cars.json',
                            {
                                params: new HttpParams().set('auth', user.token)
                            }
                        );
                    }
                ),
                tap(cars => {
                    this.carsService.setCars(cars);
                })
            )
    }
    
}