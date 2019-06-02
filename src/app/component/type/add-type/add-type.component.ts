import {Component, DoCheck, OnInit} from '@angular/core';
import {Category} from "../../../modal/category";
import {DataService} from "../../../services/dataService";
import {BaseService} from "../../../services/baseService";
import {Router} from "@angular/router";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Type} from "../../../modal/type";

declare var $;
@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css']
})
export class AddTypeComponent implements OnInit, DoCheck {
  task: string;
  submitted = false;
  spinner: boolean = false;
  globalMsg;

  type: Type = new Type();
  constructor(
    private dataService: DataService,
    private baseService: BaseService,
    private router: Router,
    private activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }
  ngDoCheck(): void {
    this.type = this.dataService.getType();
    if (this.type.id == null) {
      this.task = 'Add';
    } else { this.task = 'Edit'; }


  }

  onSubmit() {
    this.submitted = true;
    this.baseService.saveOrEdit(this.type, 'v1/type/').subscribe(result => {
       /* $('.add-category').modal('hide');*/
        if (this.type.id == null) {
          this.globalMsg = 'SUCCESSFULLY ADDED TYPE';
        } else {
          this.globalMsg = 'SUCCESSFULLY EDITED TYPE';
        }

        this.dataService.getGlobalMsg(this.globalMsg);
        this.dataService.getAlertMsg('true');
        this.type = new Type();
        this.router.navigateByUrl('home/dashboard', { skipLocationChange: true }).then(() =>
          this.router.navigate(['home/type']));
        /*$('.alert-custom').slideDown();*/
        this.modalService.dismissAll(AddTypeComponent);

      }, error => {

        this.modalService.dismissAll(AddTypeComponent);

        this.globalMsg = error.error.message;
        this.dataService.getGlobalMsg(this.globalMsg);
        this.dataService.getAlertMsg('false');

        this.router.navigateByUrl('home/dashboard', { skipLocationChange: true }).then(() =>
          this.router.navigate(['home/type']));
        /*$('.alert-custom').slideDown();*/
        this.modalService.dismissAll(AddTypeComponent);
      }
    );
  }

}
