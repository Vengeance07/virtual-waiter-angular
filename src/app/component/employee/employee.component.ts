import {Component, DoCheck, OnInit} from '@angular/core';
import {Pageable} from "../../services/pageable";
import {DataService} from "../../services/dataService";
import {BaseService} from "../../services/baseService";
import {Pagination} from "../../services/pagination";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Employee} from "../../modal/employee";
import {AddEmployeeComponent} from "./add-employee/add-employee.component";
import {EmpPosition} from "../../modal/empPosition";

declare var $;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, DoCheck {

  dataList: any;
  spinner: boolean = false;
  globalMsg;
  search: any = {};
  pageable: Pageable = new Pageable();
  currentApi: any;
  activeCount: any;
  inactiveCount: any;
  employee: Employee = new Employee();
  position: EmpPosition = new EmpPosition();
  public popoverTitle: string = 'Delete';
  public popoverMessage: string = 'Are you sure you want to delete?';
  public cancelClicked: boolean = false;

  constructor(
    private dataService: DataService,
    private baseService: BaseService,
    private paginationService: Pagination,
    private router: Router,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.currentApi = 'v1';
    this.baseService.getByAll(this.currentApi + '/employee').subscribe((response: any) => {
      this.dataList = response;

      this.dataService.setDataList(this.dataList);
      console.log(this.dataList);
      this.spinner = false;
    });
  }

  ngDoCheck(): void {
    this.dataList = this.dataService.getDataList();
  }

  openEdit(employee: Employee) {
    this.dataService.setEmployee(employee);
    this.modalService.open(AddEmployeeComponent);
  }

  deleteId(list: any) {
    console.log(list.id);
    this.baseService.deleteById(this.currentApi + '/employee/' + list.id).subscribe((res: any) => {
      console.log(res);
      this.router.navigateByUrl('home/dashboard', {skipLocationChange: true}).then(() =>
        this.router.navigate(['home/employee']));
    });
  }

  addEmployee() {
    this.dataService.setEmployee(new Employee());
    /*$('.add-category').modal('show');*/
    console.log('Clicked');
    this.modalService.open(AddEmployeeComponent);
  }


}
