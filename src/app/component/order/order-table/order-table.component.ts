import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../services/dataService";
import {BaseService} from "../../../services/baseService";
import {Pagination} from "../../../services/pagination";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Order} from "../../../modal/order";
import {User} from "../../../modal/user";
import {Pageable} from "../../../services/pageable";

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit {

  dataList: Array<Order>;
  userList: Array<User>;
  show = false;
  title: string;
  spinner: boolean = false;
  globalMsg;
  search: any = {};
  pageable: Pageable = new Pageable();
  currentApi: any;
  activeCount: any;
  inactiveCount: any;
  order: any;
  user: User = new User();

  constructor(
    private dataService: DataService,
    private baseService: BaseService,
    private paginationService: Pagination,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    // this.title = this.userList.userName;
    this.baseService.getByAll('v1/user').subscribe((response: any) => {
      this.user = response;
      console.log(this.user);
    });

    this.title = "user";
  }

  toggle() {
    this.show = !this.show;
  }
}
