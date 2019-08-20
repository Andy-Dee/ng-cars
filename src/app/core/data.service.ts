import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Product } from '../shared/product.model';
import { Balance } from '../shared/balance.model';

@Injectable()

export class DataService {
    baseUrl: string = 'assets/data/';
    orders: Product[] = [];
    balances: Balance[] = [];

    constructor( private http: HttpClient ) {}

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

    fetchAccounts() : Observable<any> {
        return this.http
            .get<any>(this.baseUrl + 'accounts.json')
            .pipe(
                map(res => res),
                catchError(this.handleErrorObservable)
            )
    }

    
}