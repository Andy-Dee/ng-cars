import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { OrdersComponent } from './orders/orders.component';
import { RequestsComponent } from './requests/requests.component';
import { BalanceComponent } from './balance/balance.component';
import { CarsComponent } from './cars/cars.component';
import { AccountsComponent } from './accounts/accounts.component';
import { SaleComponent } from './sale/sale.component';
import { ProfileComponent } from './profile/profile.component';
import { DataService } from './core/data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OrdersComponent,
    RequestsComponent,
    BalanceComponent,
    CarsComponent,
    AccountsComponent,
    SaleComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    Title,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
