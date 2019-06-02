import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


import { ApiListService} from './services/api-list';
import { BaseService} from './services/baseService';
import {DataService} from './services/dataService';
import { Pageable} from './services/pageable';
import { Pagination} from './services/pagination';
import {RestApiService} from './services/rest-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/base/header/header.component';
import { FooterComponent } from './component/base/footer/footer.component';
import { SidebarComponent } from './component/base/sidebar/sidebar.component';
import { BaseComponent } from './component/base/base.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MenuComponent } from './component/menu/menu.component';
import { CategoryComponent } from './component/category/category.component';
import { AddCategoryComponent } from './component/category/add-category/add-category.component';
import { AddMenuComponent } from './component/menu/add-menu/add-menu.component';
import { OrderComponent } from './component/order/order.component';
import { TypeComponent } from './component/type/type.component';
import { AddTypeComponent } from './component/type/add-type/add-type.component';
import { UserComponent } from './component/user/user.component';
import { AddUserComponent } from './component/user/add-user/add-user.component';
import { PositionComponent } from './component/position/position.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { AddPositionComponent } from './component/position/add-position/add-position.component';
import { AddEmployeeComponent } from './component/employee/add-employee/add-employee.component';
import { OrderTableComponent } from './component/order/order-table/order-table.component';
import { NumbersOnlyDirective } from './numbers-only.directive';
import {NgxPaginationModule} from 'ngx-pagination';
import { PrintLayoutComponent } from './component/print-layout/print-layout.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import {PrintService} from "./print.service";
import { LogoutComponent } from './component/logout/logout.component';
import {BasicAuthHttpInterceptorService} from "./services/basic-auth-http-interceptor.service";
import {ErrorInterceptorService} from "./services/error-interceptor.service";
import {ConfirmationPopoverModule} from "angular-confirmation-popover";
import { OfferComponent } from './component/offer/offer.component';
import { AddOfferComponent } from './component/offer/add-offer/add-offer.component';
import { OrdersComponent } from './component/orders/orders.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BaseComponent,
    LoginComponent,
    DashboardComponent,
    MenuComponent,
    CategoryComponent,
    AddCategoryComponent,
    AddMenuComponent,
    OrderComponent,
    TypeComponent,
    AddTypeComponent,
    UserComponent,
    AddUserComponent,
    PositionComponent,
    EmployeeComponent,
    AddPositionComponent,
    AddEmployeeComponent,
    OrderTableComponent,
    NumbersOnlyDirective,
    PrintLayoutComponent,
    InvoiceComponent,
    LogoutComponent,
    OfferComponent,
    AddOfferComponent,
    OrdersComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    NgxPaginationModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })


  ],
  exports: [
    CategoryComponent
  ],
  providers: [BaseService, RestApiService, DataService, PrintService,
    {
      provide: HTTP_INTERCEPTORS, useClass: BasicAuthHttpInterceptorService, multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddCategoryComponent,
    AddTypeComponent,
    AddUserComponent,
    AddPositionComponent,
    AddEmployeeComponent,
    AddMenuComponent,
    AddOfferComponent
  ]
})
export class AppModule { }
