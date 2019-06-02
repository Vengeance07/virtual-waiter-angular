import {Component, DoCheck, OnInit} from '@angular/core';
import {Type} from "../../../modal/type";
import {DataService} from "../../../services/dataService";
import {BaseService} from "../../../services/baseService";
import {Router} from "@angular/router";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../../../modal/user";

declare var $;
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, DoCheck {
  task: string;
  submitted = false;
  spinner: boolean = false;
  globalMsg;

  user: User = new User();
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
    this.user = this.dataService.getUser();
    if (this.user.id == null) {
      this.task = 'Add';
    } else { this.task = 'Edit'; }


  }

  onSubmit() {
    this.submitted = true;
    this.baseService.saveOrEdit(this.user, 'v1/user/').subscribe(result => {
        /*$('.add-category').modal('hide');*/
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
        /*$(".alert-custom").slideDown();*/
        this.modalService.dismissAll(AddUserComponent);



      }, error => {

        /*$('.add-category').modal('hide');*/

        this.globalMsg = error.error.message;
        this.dataService.getGlobalMsg(this.globalMsg);
        this.dataService.getAlertMsg('false');

        this.router.navigateByUrl('home/dashboard', { skipLocationChange: true }).then(() =>
          this.router.navigate(['home/user']));
        /*$(".alert-custom").slideDown();*/
        this.modalService.dismissAll(AddUserComponent);

      }
    );
  }

}
