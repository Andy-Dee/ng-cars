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
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {path: '', redirectTo: '/auth', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {
    path: 'orders', 
    component: OrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'requests', 
    component: RequestsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'balance', 
    component: BalanceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cars', 
    component: CarsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bills', 
    component: BillsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sale', 
    component: SaleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile', 
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {path: '**', redirectTo: '/auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
