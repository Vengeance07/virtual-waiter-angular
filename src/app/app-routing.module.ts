import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent} from './component/base/base.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {LoginComponent} from './component/login/login.component';
import {MenuComponent} from './component/menu/menu.component';
import {CategoryComponent} from "./component/category/category.component";
import {TypeComponent} from "./component/type/type.component";
import {UserComponent} from "./component/user/user.component";
import {OrderComponent} from "./component/order/order.component";
import {EmployeeComponent} from "./component/employee/employee.component";
import {PositionComponent} from "./component/position/position.component";
import {PrintLayoutComponent} from "./component/print-layout/print-layout.component";
import {InvoiceComponent} from "./component/invoice/invoice.component";
import {LogoutComponent} from "./component/logout/logout.component";
import {AuthGaurdService} from "./services/auth-gaurd.service";
import {OfferComponent} from "./component/offer/offer.component";
import {OrdersComponent} from "./component/orders/orders.component";

const routes: Routes = [
  { path: '', component: LoginComponent},
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGaurdService]},
  {path: 'home', component: BaseComponent, canActivate: [AuthGaurdService],
    children: [
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGaurdService]},
      {path: 'menu', component: MenuComponent, canActivate: [AuthGaurdService]},
      {path: 'category', component: CategoryComponent, canActivate: [AuthGaurdService]},
      {path: 'type', component: TypeComponent, canActivate: [AuthGaurdService]},
      {path: 'user', component: UserComponent, canActivate: [AuthGaurdService]},
      {path: 'order', component: OrderComponent, canActivate: [AuthGaurdService]},
      {path: 'orders', component: OrdersComponent, canActivate: [AuthGaurdService]},
      {path: 'employee', component: EmployeeComponent, canActivate: [AuthGaurdService]},
      {path: 'position', component: PositionComponent, canActivate: [AuthGaurdService]},
      {path: 'offer', component: OfferComponent, canActivate: [AuthGaurdService]}
    ]
  },
  {path: 'print', component: PrintLayoutComponent,
    children: [
      {path: 'invoice', component: InvoiceComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
