import {Component, DoCheck, OnInit} from '@angular/core';
import {Category} from "../../../modal/category";
import {DataService} from "../../../services/dataService";
import {BaseService} from "../../../services/baseService";
import {Pagination} from "../../../services/pagination";
import {Router} from "@angular/router";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {__decorate} from "tslib";
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

declare var $;
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit, DoCheck {
  task: string;
  submitted = false;
  spinner: boolean = false;
  globalMsg;
  selectedFile = null;
  category: Category = new Category();
  SERVER_URL = "http://http://localhost:8086/v1/category";
  uploadForm: FormGroup;
  fileToUpload: File = null;
  url: string = 'http://localhost:8086/v1';

  constructor(
    private dataService: DataService,
    private baseService: BaseService,
    private router: Router,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private modalService: NgbModal
  ) {
    /*this.uploadForm = new FormGroup({
      id: new FormGroup('key'),
      name: new FormGroup(''),
      profile: new FormGroup(null)
    });*/
  }

  ngOnInit() {
    /*this.uploadForm = this.formBuilder.group({
      id:[''],
      name: [''],
      profile: ['']
    });*/
  }
  ngDoCheck(): void {
    this.category = this.dataService.getCategory();
    if (this.category.id == null) {
      this.task = 'Add';
    } else { this.task = 'Edit'; }


  }

  onSubmit() {

    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    fd.append('empJson', JSON.stringify(this.category));
    this.http.post(this.url + '/category', fd)
      .subscribe(res => {
        console.log(res);
        this.router.navigateByUrl('home/dashboard', { skipLocationChange: true }).then(() =>
          this.router.navigate(['home/category']));
      });
    this.modalService.dismissAll(AddCategoryComponent);

    /*this.baseService.postFile(this.category, this.fileToUpload).subscribe(
      data => {
        console.log('done');
        console.log(data);

      }
    );*/



    /*const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);

    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
*/
    /*this.submitted = true;
    this.baseService.saveOrEdit(this.category, '/v1/category/').subscribe(result => {
        console.log(this.category);
        $('.add-category').modal('hide');
        if (this.category.id == null) {
          this.globalMsg = "SUCCESSFULLY ADDED CATEGORY";
        } else {
          this.globalMsg = "SUCCESSFULLY EDITED CATEGORY";
        }

        this.dataService.getGlobalMsg(this.globalMsg);
        this.dataService.getAlertMsg('true');
        this.category = new Category();
        this.router.navigateByUrl('home/dashboard', { skipLocationChange: true }).then(() =>
          this.router.navigate(["home/category"]));
        $(".alert-custom").slideDown();



      }, error => {
      console.log(this.category);
        $('.add-category').modal('hide');

        this.globalMsg = error.error.message;
        this.dataService.getGlobalMsg(this.globalMsg);
        this.dataService.getAlertMsg('false');

        this.router.navigateByUrl('home/dashboard', { skipLocationChange: true }).then(() =>
          this.router.navigate(["home/category"]));
        $(".alert-custom").slideDown();

      }
    );*/
  }
  onFileSelected(event) {
    // console.log(this.menu);
    console.log(this.category);
    this.selectedFile = event.target.files[0];
  }

}
