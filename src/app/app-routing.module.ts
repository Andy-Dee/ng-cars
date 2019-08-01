import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { RequestsComponent } from './requests/requests.component';
import { BalanceComponent } from './balance/balance.component';
import { CarsComponent } from './cars/cars.component';
import { AccountsComponent } from './accounts/accounts.component';
import { SaleComponent } from './sale/sale.component';
import { PersonalComponent } from './personal/personal.component';


const routes: Routes = [
  {path: '', redirectTo: '/orders', pathMatch: 'full'},
  {path: 'orders', component: OrdersComponent},
  {path: 'requests', component: RequestsComponent},
  {path: 'balance', component: BalanceComponent},
  {path: 'cars', component: CarsComponent},
  {path: 'accounts', component: AccountsComponent},
  {path: 'sale', component: SaleComponent},
  {path: 'personal', component: PersonalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
