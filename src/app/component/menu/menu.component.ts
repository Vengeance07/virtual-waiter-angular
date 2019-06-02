import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {Pageable} from "../../services/pageable";
import {Router} from "@angular/router";
import {DataService} from "../../services/dataService";
import {BaseService} from "../../services/baseService";
import {Pagination} from "../../services/pagination";
import {Category} from "../../modal/category";
import {Menu} from "../../modal/menu";
import {Employee} from "../../modal/employee";
import {AddEmployeeComponent} from "../employee/add-employee/add-employee.component";
import {AddMenuComponent} from "./add-menu/add-menu.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

declare var $;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, DoCheck {

  dataList: any;
  spinner: boolean = false;
  globalMsg;
  search: any = {};
  pageable: Pageable = new Pageable();
  currentApi: any;
  activeCount: any;
  inactiveCount: any;
  menues: any;
  category: Category = new Category();
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
    this.baseService.getByAll(this.currentApi + '/menu').subscribe((response: any) => {
      this.dataList = response;

      this.dataService.setDataList(this.dataList);
      this.spinner = false;

    }, error => {
      this.globalMsg = error.error.message;
      if (this.globalMsg == null) {
        this.globalMsg = "Please check your network connection"
      }
      this.spinner = false;
      this.dataService.getGlobalMsg(this.globalMsg);
      $('.global-msgModal').modal('show');
    }
    );



  }



  ngDoCheck(): void {
    this.dataList = this.dataService.getDataList();
  }
  addMenu() {
    this.dataService.setMenu(new Menu());
    /*$('.add-category').modal('show');*/
    this.modalService.open(AddMenuComponent);
  }
  openEdit(menu: Menu) {
    this.dataService.setMenu(menu);
    this.modalService.open(AddMenuComponent);
  }
  deleteId(list: any) {
    console.log(list.id);
    this.baseService.deleteById(this.currentApi + '/menu/' + list.id).subscribe((res: any) => {
      console.log(res);
      this.router.navigateByUrl('home/dashboard', { skipLocationChange: true }).then(() =>
        this.router.navigate(['home/menu']));
    });
  }

}
