import {Component, DoCheck, OnInit} from '@angular/core';
import {DataService} from '../../../services/dataService';
import {BaseService} from '../../../services/baseService';
import {Router} from '@angular/router';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EmpPosition} from '../../../modal/empPosition';

declare var $;
@Component({
  selector: 'app-add-position',
  templateUrl: './add-position.component.html',
  styleUrls: ['./add-position.component.css']
})
export class AddPositionComponent implements OnInit, DoCheck {
  task: string;
  submitted = false;
  spinner: boolean = false;
  globalMsg;

  position: EmpPosition = new EmpPosition();
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
    this.position = this.dataService.getPosition();
    if (this.position.id == null) {
      this.task = 'Add';
    } else { this.task = 'Edit'; }


  }

  onSubmit(e) {
    console.log(e);
    this.submitted = true;
    this.baseService.saveOrEdit(this.position, 'v1/position/').subscribe(result => {
        /*$('.add-category').modal('hide');*/
        if (this.position.id == null) {
          this.globalMsg = 'SUCCESSFULLY ADDED POSITION';
        } else {
          this.globalMsg = 'SUCCESSFULLY EDITED POSITION';
        }

        this.dataService.getGlobalMsg(this.globalMsg);
        this.dataService.getAlertMsg('true');
        this.position = new EmpPosition();
        this.router.navigateByUrl('home/dashboard', { skipLocationChange: true }).then(() =>
          this.router.navigate(['home/position']));
        /*$('.alert-custom').slideDown();*/
        this.modalService.dismissAll(AddPositionComponent);


      }, error => {

        /*$('.add-category').modal('hide');*/

        this.globalMsg = error.error.message;
        this.dataService.getGlobalMsg(this.globalMsg);
        this.dataService.getAlertMsg('false');

        this.router.navigateByUrl('home/dashboard', { skipLocationChange: true }).then(() =>
          this.router.navigate(['home/position']));
        /*$('.alert-custom').slideDown();*/
        this.modalService.dismissAll(AddPositionComponent);
      }
    );
  }

}
