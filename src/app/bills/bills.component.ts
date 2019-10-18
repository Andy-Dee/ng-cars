import { Component, OnInit } from '@angular/core';
import { Bill } from '../shared/bills.model';
import { Observable, Subject } from 'rxjs';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  bills: Bill[] = [];
  bill: Bill;
  errorMessage: string;
  observableBill: Observable<Bill[]>;
  billsChanged = new Subject<Bill[]>();
  isLoading = true;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.observableBill = this.dataService.fetchBills();
    this.observableBill.subscribe(
      bills => {
        this.bills = bills;
        this.isLoading = false;      
      },
      error => this.errorMessage = error
    )
  }

  deleteBill(index: number) {
    let bills = this.bills;  
    this.billsChanged.next(bills.splice(index, 1));
    console.log(index);
  }

}
