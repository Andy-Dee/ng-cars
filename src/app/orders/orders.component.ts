import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/product.model';
import { DataService } from '../core/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  products$: Observable<Product[]>;  
  products: Product[] = [];
  cacheProducts: Product[] = [];
  product: Product;
  errorMessage: string;
  ordersChecked: any[] = [];
  i: number = 0;
  lengthAllProductsArray: any;
  lengthFilteredSent: any;
  lengthFilteredAgreement: any;
  lengthFilteredPending: any;
  lengthFilteredDeclined: any; 
  isLoading = true; 

  constructor(
    private dataServive: DataService
  ) { }

  ngOnInit() {
    this.products$ = this.dataServive.fetchOrders();
    this.products$.subscribe(
      products => {
        this.products = products;
        this.cacheProducts = products;
        this.lengthAllProductsArray = this.products.length;
        this.lengthFilteredSent = this.products.filter((product) => product.status == 'Sent').length;
        this.lengthFilteredAgreement = this.products.filter((product) => product.status == 'Agreement').length;
        this.lengthFilteredPending = this.products.filter((product) => product.status == 'Pending').length;
        this.lengthFilteredDeclined = this.products.filter((product) => product.status == 'Declined').length;
        this.isLoading = false;
      },
      error => this.errorMessage = <any>error
    );
  }
  
  checkedOrder(product: Product) {
    if (this.ordersChecked.find(x => x == product)) {
      this.ordersChecked.splice(this.ordersChecked.indexOf(product), 1);
    } else {
      this.ordersChecked.push(product);
    }
    console.log(this.ordersChecked);
  }
  // Another possible option
  // checkedOrder(id: number, event: Event) {
  //   if (event) {
  //     this.ordersChecked.push({id: id});
  //   } else {
  //     const index = this.ordersChecked.find(
  //       list => list.id === id
  //     );
  //     this.ordersChecked.splice(index, 1);
  //   }    
  //   console.log(this.ordersChecked);
  // }

  deleteOrdersChecked() {
    for (this.i = 0; this.i < this.ordersChecked.length; this.i++) {
      if (this.products.find(x => x == this.ordersChecked[this.i])) {
        this.products.splice(this.products.indexOf(this.ordersChecked[this.i]), 1);
        this.lengthAllProductsArray = this.products.length;
        this.lengthFilteredSent = this.products.filter((product) => product.status == 'Sent').length;
        this.lengthFilteredAgreement = this.products.filter((product) => product.status == 'Agreement').length;
        this.lengthFilteredPending = this.products.filter((product) => product.status == 'Pending').length;
        this.lengthFilteredDeclined = this.products.filter((product) => product.status == 'Declined').length;
      }
    }    
  }

  deleteOrder(product: Product) {
    let orders = this.products;
    let index = orders.indexOf(product);
    this.products.splice(index, 1);
    console.log(index);
    this.lengthAllProductsArray = this.products.length;
    this.lengthFilteredSent = this.products.filter((product) => product.status == 'Sent').length;
    this.lengthFilteredAgreement = this.products.filter((product) => product.status == 'Agreement').length;
    this.lengthFilteredPending = this.products.filter((product) => product.status == 'Pending').length;
    this.lengthFilteredDeclined = this.products.filter((product) => product.status == 'Declined').length;
  }

  filterByClick(event: any) {
    let filterData = event.target.innerHTML;
    console.log(filterData);    
    this.products = this.cacheProducts.filter((product) => product.status == filterData);
    if (filterData === 'All') {
      this.products = this.cacheProducts;
    }
  }

}
