import {Component, DoCheck, OnInit} from '@angular/core';
import {Category} from "../../../modal/category";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Offer} from "../../../modal/offer";
import {DataService} from "../../../services/dataService";
import {BaseService} from "../../../services/baseService";
import {Router} from "@angular/router";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit, DoCheck {

  task: string;
  submitted = false;
  spinner: boolean = false;
  globalMsg;
  selectedFile = null;
  offer: Offer = new Offer();
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
  ) { }

  ngOnInit() {
  }

  ngDoCheck(): void {
    this.offer = this.dataService.getOffer();
    if (this.offer.id == null) {
      this.task = 'Add';
    } else { this.task = 'Edit'; }


  }

  onSubmit() {

    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    fd.append('empJson', JSON.stringify(this.offer));
    this.http.post(this.url + '/offer', fd)
      .subscribe(res => {
        console.log(res);
        this.router.navigateByUrl('home/dashboard', {skipLocationChange: true}).then(() =>
          this.router.navigate(['home/offer']));
      });
    this.modalService.dismissAll(AddOfferComponent);
  }
  onFileSelected(event) {
    // console.log(this.menu);
    console.log(this.offer);
    this.selectedFile = event.target.files[0];
  }

}
