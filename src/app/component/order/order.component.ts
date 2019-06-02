import {Component, DoCheck, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Pageable} from "../../services/pageable";
import {EmpPosition} from "../../modal/empPosition";
import {DataService} from "../../services/dataService";
import {BaseService} from "../../services/baseService";
import {Pagination} from "../../services/pagination";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Employee} from "../../modal/employee";
import {AddEmployeeComponent} from "../employee/add-employee/add-employee.component";
import {User} from "../../modal/user";
import {Order} from "../../modal/order";
import { Observable, interval, Subscription } from 'rxjs';
import {PrintService} from "../../print.service";
import {CallWaiter} from "../../modal/callWaiter";

declare var $;
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, DoCheck, OnDestroy {

  dataList: Array<Order>;
  public popoverTitle: string = 'Delete';
  public popoverMessage: string = 'Are you sure you want to delete?';
  public cancelClicked: boolean = false;
  list: any;
  userList: Array<User>;
  spinner: boolean = false;
  title: string;
  globalMsg;
  show = false;
  search: any = {};
  total: number;
  pageable: Pageable = new Pageable();
  currentApi: any;
  activeCount: any;
  inactiveCount: any;
  order: any;
  users: User = new User();
  orders: Order = new Order();
  submitted = false;
  waiterList: Array<CallWaiter>;
  @ViewChild('dataTable') table;
  dataTable: any;
  dtOptions: any;
  disableButton;
  private updateSubscription: Subscription;
  constructor(
    private dataService: DataService,
    private baseService: BaseService,
    private paginationService: Pagination,
    private router: Router,
    private modalService: NgbModal,
    public printService: PrintService
  ) { }

  ngOnInit() {
    this.updateSubscription = interval(10000).subscribe(
      (val) => {this.updateStatus()}
    );

    this.currentApi = 'v1';
    this.baseService.getByAll(this.currentApi + '/order').subscribe((response: any) => {
      this.dataList = response;
      this.list = this.dataList;
      this.total = this.list.price * this.list.quantity;
      console.log(this.total);
      this.dataService.setDataList(this.dataList);
      this.spinner = false;

      this.baseService.getByAll(this.currentApi + '/user').subscribe((res: any) => {
        this.userList = res;
        this.users = res;
        console.log(this.userList);

        this.baseService.getByAll(this.currentApi + '/call').subscribe((re: any) => {
            this.waiterList = re;
        });
      });

    }, error => {
      this.globalMsg = error.error.message;
      if (this.globalMsg == null) {
        this.globalMsg = 'Please check your network connection';
      }
      this.spinner = false;
      this.dataService.getGlobalMsg(this.globalMsg);
      $('.global-msgModal').modal('show');
    });

    this.title = this.users.userName;

  }

    ngOnDestroy() {
    this.updateSubscription.unsubscribe();
  }

  private updateStatus(){
    this.router.navigateByUrl('home/dashboard', { skipLocationChange: true }).then(() =>
      this.router.navigate(['home/order']));
    /*this.ngOnInit();*/
  }

  ngDoCheck(): void {
    this.dataList = this.dataService.getDataList();

    /*$(function = () => {
      $('$orderPrint').DataTable({
        dom: 'Bfrtip',
        buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
        ]
      });
    });*/

  }
  /*openEdit(employee: Employee) {
    this.dataService.setEmployee(employee);
    this.modalService.open(AddEmployeeComponent);
  }*/

  /*addEmployee() {
    this.dataService.setEmployee(new Employee());
    /!*$('.add-category').modal('show');*!/
    console.log("Clicked");
    this.modalService.open(AddEmployeeComponent);
  }*/

  toggle() {
    this.show = !this.show;
  }

  remove(list: any) {
    list.users.id = '212';
    console.log(list);
    this.submitted = true;
    this.baseService.saveOrEdit(list, 'v1/order/').subscribe(result => {
        /*$('.add-category').modal('hide');*/
        if (list.id == null) {
          this.globalMsg = 'SUCCESSFULLY ADDED POSITION';
        } else {
          this.globalMsg = 'SUCCESSFULLY EDITED POSITION';
        }

        this.dataService.getGlobalMsg(this.globalMsg);
        this.dataService.getAlertMsg('true');
        this.orders = new Order();
        this.router.navigateByUrl('home/dashboard', { skipLocationChange: true }).then(() =>
          this.router.navigate(['home/order']));
        $('.alert-custom').slideDown();
        // this.modalService.dismissAll(AddPositionComponent);


      }, error => {

        /*$('.add-category').modal('hide');*/

        this.globalMsg = error.error.message;
        this.dataService.getGlobalMsg(this.globalMsg);
        this.dataService.getAlertMsg('false');

        this.router.navigateByUrl('home/dashboard', { skipLocationChange: true }).then(() =>
          this.router.navigate(['home/order']));
        /*$('.alert-custom').slideDown();*/
        // this.modalService.dismissAll(AddPositionComponent);
      }
    );
  }
  /*/!*this.disableButton = true;*!/
  var index = this.dataList.indexOf(addItem);
  /!*this.dataList.splice(index, 1);*!/
  this.order = this.dataList;
  console.log(this.order(index, 1));*/
  /*}*/

  /*paid(){
    console.log(this.dataList.toString());*/
    /*orders: Order = new Order(this.order.id, )*/
    /*this.submitted = true;*/
    /*this.baseService.saveOrEdit(this.user, '/v1/user/').subscribe(result => {
        /!*$('.add-category').modal('hide');*!/
        if (this.user.id == null) {
          this.globalMsg = 'SUCCESSFULLY ADDED USER';
        } else {
          this.globalMsg = 'SUCCESSFULLY EDITED USER';
        }

        this.dataService.getGlobalMsg(this.globalMsg);
        this.dataService.getAlertMsg('true');
        this.user = new User();
        this.router.navigateByUrl('home/dashboard', { skipLocationChange: true }).then(() =>
          this.router.navigate(['home/user']));
        /!*$(".alert-custom").slideDown();*!/
        this.modalService.dismissAll(AddUserComponent);



      }, error => {

        /!*$('.add-category').modal('hide');*!/

        this.globalMsg = error.error.message;
        this.dataService.getGlobalMsg(this.globalMsg);
        this.dataService.getAlertMsg('false');

        this.router.navigateByUrl('home/dashboard', { skipLocationChange: true }).then(() =>
          this.router.navigate(['home/user']));
        /!*$(".alert-custom").slideDown();*!/
        this.modalService.dismissAll(AddUserComponent);

      }
    );*/
  /*}*/
  onPrintInvoice() {
    /*const invoiceIds = ['101', '102'];
    this.printService.printDocument('invoice', invoiceIds);*/
    this.router.navigate(['http://localhost:4200/print/invoice']);
    this.router.navigateByUrl('home/dashboard', { skipLocationChange: true }).then(() =>
      this.router.navigate(['print/invoice']));
  }

  deleteId(list: any) {
    console.log(list.id);
    this.baseService.deleteById(this.currentApi + '/order/' + list.id).subscribe((res: any) => {
      console.log(res);
      this.router.navigateByUrl('home/dashboard', { skipLocationChange: true }).then(() =>
        this.router.navigate(['home/order']));
    });
  }

  deleteWaiterId(list: any) {
    this.baseService.deleteById(this.currentApi + '/call/' + list.id).subscribe((res: any) => {
      this.router.navigateByUrl('home/dashboard', { skipLocationChange: true }).then(() =>
        this.router.navigate(['home/order']));
    });
  }
}
