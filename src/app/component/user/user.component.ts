import {Component, DoCheck, OnInit} from '@angular/core';
import {Pageable} from "../../services/pageable";
import {DataService} from "../../services/dataService";
import {BaseService} from "../../services/baseService";
import {Pagination} from "../../services/pagination";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Type} from "../../modal/type";
import {AddTypeComponent} from "../type/add-type/add-type.component";
import {User} from "../../modal/user";
import {AddUserComponent} from "./add-user/add-user.component";

declare var $;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, DoCheck {

  dataList: any;
  spinner: boolean = false;
  globalMsg;
  search: any = {};
  pageable: Pageable = new Pageable();
  currentApi: any;
  activeCount: any;
  inactiveCount: any;
  user: any;
  public popoverTitle: string = 'Delete';
  public popoverMessage: string = 'Are you sure you want to delete?';
  public cancelClicked: boolean = false;

  constructor(
    private dataService: DataService,
    private baseService: BaseService,
    private paginationService: Pagination,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.currentApi = 'v1';
    this.baseService.getByAll(this.currentApi + '/user').subscribe((response: any) => {
      this.dataList = response;

      this.dataService.setDataList(this.dataList);
      console.log(this.dataList);
      this.spinner = false;
    });
  }
  ngDoCheck(): void {
    this.dataList = this.dataService.getDataList();
  }
  openEdit(user: User) {
    this.dataService.setUser(user);
    this.modalService.open(AddUserComponent);
  }

  addUser() {
    this.dataService.setUser(new User());
    /*$('.add-category').modal('show');*/
    console.log('Clicked');
    this.modalService.open(AddUserComponent);
  }
  deleteId(list: any) {
    console.log(list.id);
    this.baseService.deleteById(this.currentApi + '/user/' + list.id).subscribe((res: any) => {
      console.log(res);
      this.router.navigateByUrl('home/dashboard', { skipLocationChange: true }).then(() =>
        this.router.navigate(['home/user']));
    });
  }


}
