import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/product.model';
import { DataService } from '../core/data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  observableProduct: Observable<Product[]>;  
  products: Product[] = [];
  product: Product;
  errorMessage: string;
  ordersChanged = new Subject<Product[]>();
  ordersChecked: any[] = [];
  getOrder: any;

  constructor(
    private dataServive: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.observableProduct = this.dataServive.fetchOrders();
    this.observableProduct.subscribe(
      products => this.products = products,
      error => this.errorMessage = <any>error
    );
  }

  checkedOrder(id: number, event: Event) {
    if (event) {
      this.ordersChecked.push({id: id});
    } else {
      const index = this.ordersChecked.find(
        list => list.id === id
      );
      this.ordersChecked.splice(index, 1);
    }    
    console.log(this.ordersChecked);
  }

  deleteOrdersChecked(ordersChecked: []) {
    const checked = this.ordersChecked;    
    
    // this.ordersChecked = this.products.filter(
    //   product => (product.id !== ordersChecked.id)
    // );

    console.log(checked.length);
  }

  deleteOrder(index: number) {
    let orders = this.products;  
    this.ordersChanged.next(orders.splice(index, 1));
    console.log(index);
  }

  

}
