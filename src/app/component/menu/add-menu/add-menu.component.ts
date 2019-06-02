import {Component, DoCheck, OnInit} from '@angular/core';
import {DataService} from "../../../services/dataService";
import {BaseService} from "../../../services/baseService";
import {Router} from "@angular/router";
import {Menu} from "../../../modal/menu";
import {Category} from "../../../modal/category";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient} from "@angular/common/http";


declare var $;

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit, DoCheck {

  task: string;
  _url: string = 'http://localhost:8086/v1/';
  submitted = false;
  spinner: boolean = false;
  globalMsg;
  menu: Menu = new Menu();
  Category: Category = new Category();
  categoryList: any;
  selectedFile = null;

  constructor(
    private dataService: DataService,
    private baseService: BaseService,
    private router: Router,
    private activeModal: NgbActiveModal,
    private http: HttpClient,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.baseService.getByAll('v1/category').subscribe((response: any) => {
      this.categoryList = response;
      console.log(this.categoryList);

    });
    this.menu = this.dataService.getMenu();
    if (this.menu.id !== undefined && this.menu.id !== 0) {
      this.Category = this.menu.category;
    }
  }

  ngDoCheck(): void {
    this.menu = this.dataService.getMenu();
    if (this.menu.id == null) {
      this.task = 'Add';
    } else {
      this.task = 'Edit';
    }


  }

  onSubmit() {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    fd.append('empJson', JSON.stringify(this.menu));
    this.http.post(this._url + this.Category.id + '/menu', fd)
      .subscribe(res => {
        console.log(res);
        this.router.navigateByUrl('home/dashboard', {skipLocationChange: true}).then(() =>
          this.router.navigate(['home/menu']));
      });
    this.modalService.dismissAll(AddMenuComponent);

    /* this.submitted = true;
     console.log(this.category)
     this.menu.category = this.category;
     this.baseService.saveOrEdit(this.menu, '/v1/menu').subscribe(result => {
         console.log("result");
         console.log(result);
         $('.add-menu').modal('hide');
         if (this.menu.id == null) {
           this.globalMsg = "SUCCESSFULLY ADDED MENU";
         } else {
           this.globalMsg = "SUCCESSFULLY EDITED MENU";
         }

         this.dataService.getGlobalMsg(this.globalMsg);
         this.dataService.getAlertMsg('true');
         this.menu = new Menu();
         this.router.navigateByUrl('home/dashboard', { skipLocationChange: true }).then(() =>
           this.router.navigate(["home/menu"]));
         $(".alert-custom").slideDown();



       }, error => {

         $('.add-menu').modal('hide');

         this.globalMsg = error.error.message;
         this.dataService.getGlobalMsg(this.globalMsg);
         this.dataService.getAlertMsg('false');

         this.router.navigateByUrl('home/dashboard', { skipLocationChange: true }).then(() =>
           this.router.navigate(["home/menu"]));
         $(".alert-custom").slideDown();

       }
     );*/
  }

  onFileSelected(event) {
    // console.log(this.menu);
    console.log(this.Category);
    this.selectedFile = event.target.files[0];
  }

}
