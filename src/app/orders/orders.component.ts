import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/product.model';
import { DataService } from '../core/data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  products$: Observable<Product[]>;  
  products: Product[] = [];
  product: Product;
  errorMessage: string;
  ordersChecked: any[] = [];
  ordersChanged$ = new Subject<Product[]>();

  i: number = 0;
  

  constructor(
    private dataServive: DataService
  ) { }

  ngOnInit() {
    this.products$ = this.dataServive.fetchOrders();
    this.products$.subscribe(
      products => this.products = products,
      error => this.errorMessage = <any>error
    );

    this.ordersChanged$.subscribe(
      orders => this.ordersChecked = orders,
      error => this.errorMessage = error
    );
  }

  // checkedOrder(id: number, event: Event) {
  //   if (event) {
  //     this.ordersChecked.push({id: id});
  //     this.ordersChanged$.next(this.ordersChecked.slice());
  //   } else {
  //     const index = this.ordersChecked.find(
  //       list => list.id === id
  //     );
  //     this.ordersChecked.splice(index, 1);
  //     this.ordersChanged$.next(this.ordersChecked.slice());
  //   }    
  //   console.log(this.ordersChecked);
  //   console.log(this.ordersChanged$);
  // }
  checkedOrder(product: Product) {
    if (this.ordersChecked.find(x => x == product)) {
      this.ordersChecked.splice(this.ordersChecked.indexOf(product), 1);
      this.ordersChanged$.next(this.ordersChecked.slice());
    } else {
      this.ordersChecked.push(product);
      this.ordersChanged$.next(this.ordersChecked.slice());
    }
    console.log(this.ordersChecked);
    console.log(this.ordersChanged$);
  }

  deleteOrdersChecked(ordersChecked: Product[]) {
    for (this.i = 0; this.i < this.ordersChecked.length; this.i++) {
      if (this.products.find(x => x == this.ordersChecked[this.i])) {
        this.products.splice(this.products.indexOf(this.ordersChecked[this.i]), 1);
      }
    }
    
  }

  deleteOrder(product: Product) {
    let orders = this.products;
    let index = orders.indexOf(product);
    this.ordersChanged$.next(orders.splice(index, 1));
    console.log(index);
  }

  

}
