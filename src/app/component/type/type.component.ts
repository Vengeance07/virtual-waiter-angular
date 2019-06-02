import {Component, DoCheck, OnInit} from '@angular/core';
import {Pageable} from "../../services/pageable";
import {DataService} from "../../services/dataService";
import {BaseService} from "../../services/baseService";
import {Pagination} from "../../services/pagination";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddTypeComponent} from "./add-type/add-type.component";
import {Type} from "../../modal/type";


@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit, DoCheck {

  dataList: any;
  spinner: boolean = false;
  globalMsg;
  search: any = {};
  pageable: Pageable = new Pageable();
  currentApi: any;
  activeCount: any;
  inactiveCount: any;
  type: any;
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
    this.baseService.getByAll(this.currentApi + '/type').subscribe((response: any) => {
      this.dataList = response;

      this.dataService.setDataList(this.dataList);
      console.log(this.dataList);
      this.spinner = false;
    });
  }
  ngDoCheck(): void {
    this.dataList = this.dataService.getDataList();
  }
  openEdit(type: Type) {
    this.dataService.setType(type);
    this.modalService.open(AddTypeComponent);
  }

  addType() {
    this.dataService.setType(new Type());
    /*$('.add-category').modal('show');*/
    console.log('Clicked');
    this.modalService.open(AddTypeComponent);
  }
  deleteId(list: any) {
    console.log(list.id);
    this.baseService.deleteById(this.currentApi + '/type/' + list.id).subscribe((res: any) => {
      console.log(res);
      this.router.navigateByUrl('home/dashboard', { skipLocationChange: true }).then(() =>
        this.router.navigate(['home/type']));
    });
  }

}
