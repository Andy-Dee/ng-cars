import { Component, OnInit } from '@angular/core';
import { Account } from '../shared/accounts.model';
import { Observable } from 'rxjs';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: Account[] = [];
  account: Account;
  errorMessage: string;
  observableAccount: Observable<Account[]>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.observableAccount = this.dataService.fetchAccounts();
    this.observableAccount.subscribe(
      accounts => this.accounts = accounts,
      error => this.errorMessage = error
    )
  }

}
