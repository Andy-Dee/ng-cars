import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { RequestsComponent } from './requests/requests.component';
import { BalanceComponent } from './balance/balance.component';
import { CarsComponent } from './cars/cars.component';
import { BillsComponent } from './bills/bills.component';
import { SaleComponent } from './sale/sale.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
  {path: '', redirectTo: '/auth', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'requests', component: RequestsComponent},
  {path: 'balance', component: BalanceComponent},
  {path: 'cars', component: CarsComponent},
  {path: 'bills', component: BillsComponent},
  {path: 'sale', component: SaleComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
