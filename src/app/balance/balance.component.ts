import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data.service';
import { Observable } from 'rxjs';
import { Balance } from '../shared/balance.model';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
  balances: Balance[] = [];
  balance: Balance;
  errorMessage: string;
  observableBalance: Observable<Balance[]>;
  isLoading = true;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.observableBalance = this.dataService.fetchBalances();
    this.observableBalance.subscribe(
      balances => {
        this.balances = balances;
        this.isLoading = false;
      },
      error => this.errorMessage = error
    )
  }

}
