import {Component, DoCheck, OnInit} from '@angular/core';
import {Pageable} from "../../services/pageable";
import {DataService} from "../../services/dataService";
import {BaseService} from "../../services/baseService";
import {Pagination} from "../../services/pagination";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddTypeComponent} from "../type/add-type/add-type.component";
import {AddPositionComponent} from "./add-position/add-position.component";
import {EmpPosition} from "../../modal/empPosition";

declare var $;
@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit, DoCheck {

  dataList: any;
  spinner: boolean = false;
  globalMsg;
  search: any = {};
  pageable: Pageable = new Pageable();
  currentApi: any;
  activeCount: any;
  inactiveCount: any;
  position: any;
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
    this.baseService.getByAll(this.currentApi + '/position').subscribe((response: any) => {
      this.dataList = response;

      this.dataService.setDataList(this.dataList);
      console.log(this.dataList);
      this.spinner = false;
    });
  }
  ngDoCheck(): void {
    this.dataList = this.dataService.getDataList();
  }
  openEdit(position: EmpPosition) {
    this.dataService.setPosition(position);
    this.modalService.open(AddPositionComponent);
  }

  addPosition() {
    this.dataService.setPosition(new EmpPosition());
    /*$('.add-category').modal('show');*/
    console.log('Clicked');
    this.modalService.open(AddPositionComponent);
  }

  deleteId(list: any) {
    console.log(list.id);
    this.baseService.deleteById(this.currentApi + '/position/' + list.id).subscribe((res: any) => {
      console.log(res);
      this.router.navigateByUrl('home/dashboard', { skipLocationChange: true }).then(() =>
        this.router.navigate(['home/position']));
    });
  }
}
