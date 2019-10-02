import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { OrdersComponent } from './orders/orders.component';
import { RequestsComponent } from './requests/requests.component';
import { BalanceComponent } from './balance/balance.component';
import { CarsComponent } from './cars/cars.component';
import { BillsComponent } from './bills/bills.component';
import { SaleComponent } from './sale/sale.component';
import { ProfileComponent } from './profile/profile.component';
import { DataService } from './core/data.service';
import { HttpClientModule } from '@angular/common/http';
import { FilterUniqueCarsPipe } from './core/unique-cars.filter';
import { FilterUniqueModelsPipe } from './core/unique-models.filter';
import { FilterUniqueModificationsPipe } from './core/unique-modifications.filter';
import { CarsService } from './core/cars.service';
import { CarListComponent } from './cars/car-list/car-list.component';
import { CarItemComponent } from './cars/car-list/car-item/car-item.component';
import { AuthComponent } from './auth/auth.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OrdersComponent,
    RequestsComponent,
    BalanceComponent,
    CarsComponent,
    BillsComponent,
    SaleComponent,
    ProfileComponent,
    FilterUniqueCarsPipe,
    FilterUniqueModelsPipe,
    FilterUniqueModificationsPipe,
    CarListComponent,
    CarItemComponent,
    AuthComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    Title,
    DataService,
    CarsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
