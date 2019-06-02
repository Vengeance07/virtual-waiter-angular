import {Component, DoCheck, OnInit} from '@angular/core';
import {DataService} from "../../../services/dataService";
import {BaseService} from "../../../services/baseService";
import {Router} from "@angular/router";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Employee} from "../../../modal/employee";
import {EmpPosition} from "../../../modal/empPosition";

declare var $;

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit, DoCheck {
  task: string;
  submitted = false;
  spinner: boolean = false;
  globalMsg;

  employee: Employee = new Employee();
  Position: EmpPosition = new EmpPosition();
  positionList: any;

  constructor(
    private dataService: DataService,
    private baseService: BaseService,
    private router: Router,
    private activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.baseService.getByAll('v1/position').subscribe((response: any) => {
      this.positionList = response;
      console.log(this.positionList);

    });
    this.employee = this.dataService.getEmployee();
    if (this.employee.id !== undefined && this.employee.id !== 0) {
      this.Position = this.employee.position;
    }
    /*this.salary = new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]);*/

  }

  ngDoCheck(): void {
    this.employee = this.dataService.getEmployee();
    if (this.employee.id == null) {
      this.task = 'Add';
    } else {
      this.task = 'Edit';
    }


  }

  onSubmit() {
    this.submitted = true;
    console.log(this.Position)
    this.employee.position = this.Position;
    console.log(this.employee)
    this.baseService.saveOrEdit(this.employee, 'v1/employee').subscribe(result => {
        /*$('.add-category').modal('hide');*/
        if (this.employee.id == null) {
          this.globalMsg = "SUCCESSFULLY ADDED EMPLOYEE";
        } else {
          this.globalMsg = "SUCCESSFULLY EDITED EMPLOYEE";
        }

        this.dataService.getGlobalMsg(this.globalMsg);
        this.dataService.getAlertMsg('true');
        this.employee = new Employee();
        this.router.navigateByUrl('home/dashboard', {skipLocationChange: true}).then(() =>
          this.router.navigate(["home/employee"]));
        $(".alert-custom").slideDown();


      }, error => {

        /*$('.add-category').modal('hide');*/

        this.globalMsg = error.error.message;
        this.dataService.getGlobalMsg(this.globalMsg);
        this.dataService.getAlertMsg('false');

        this.router.navigateByUrl('home/dashboard', {skipLocationChange: true}).then(() =>
          this.router.navigate(["home/employee"]));
        $(".alert-custom").slideDown();

      }
    );
    this.modalService.dismissAll(AddEmployeeComponent);
  }


}
