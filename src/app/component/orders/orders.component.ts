import {Component, OnInit, ViewChild} from '@angular/core';
import {Order} from "../../modal/order";
import {User} from "../../modal/user";
import {Pageable} from "../../services/pageable";
import {Subscription} from "rxjs";
import {DataService} from "../../services/dataService";
import {BaseService} from "../../services/baseService";
import {Pagination} from "../../services/pagination";
import {Router} from "@angular/router";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
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
  ) { }

  ngOnInit() {
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
      });

    }, error => {
      this.globalMsg = error.error.message;
      if (this.globalMsg == null) {
        this.globalMsg = 'Please check your network connection';
      }
      /*this.spinner = false;
      this.dataService.getGlobalMsg(this.globalMsg);
      $('.global-msgModal').modal('show');*/
    });

    /*this.title = this.users.userName;*/


  }

}
