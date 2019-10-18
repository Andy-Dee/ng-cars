import { Component, OnInit } from '@angular/core';
import { Sale } from '../shared/sale.model';
import { Observable, Subject } from 'rxjs';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  sales: Sale[] = [];
  sale: Sale;
  errorMessage: string;
  observableSales: Observable<Sale[]>;
  salesChanged = new Subject<Sale[]>();
  isLoading = true;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.observableSales = this.dataService.fetchSales();
    this.observableSales.subscribe(
      sales => {
        this.sales = sales;
        this.isLoading = false;
      },
      error => this.errorMessage = error
    )
  }

  deleteSale(index: number) {
    let sales = this.sales;  
    this.salesChanged.next(sales.splice(index, 1));
    console.log(index);
  }

}
