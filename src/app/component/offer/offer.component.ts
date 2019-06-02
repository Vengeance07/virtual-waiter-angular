import {Component, DoCheck, OnInit} from '@angular/core';
import {Pageable} from "../../services/pageable";
import {Category} from "../../modal/category";
import {Offer} from "../../modal/offer";
import {DataService} from "../../services/dataService";
import {BaseService} from "../../services/baseService";
import {Pagination} from "../../services/pagination";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddCategoryComponent} from "../category/add-category/add-category.component";
import {AddOfferComponent} from "./add-offer/add-offer.component";

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit,DoCheck {

  dataList: any;
  spinner: boolean = false;
  globalMsg;
  search: any = {};
  pageable: Pageable = new Pageable();
  currentApi: any;
  activeCount: any;
  inactiveCount: any;
  offer: Offer = new Offer();
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
    this.baseService.getByAll(this.currentApi + '/offer').subscribe((response: any) => {
      this.dataList = response;

      this.dataService.setDataList(this.dataList);
      console.log(this.dataList);
      this.spinner = false;
    });
  }
  ngDoCheck(): void {
    this.dataList = this.dataService.getDataList();
  }
  openEdit(offer: Offer) {
    this.dataService.setOffer(offer);
    this.modalService.open(AddOfferComponent);
  }
  addOffer() {
    this.dataService.setOffer(new Offer());
    /*$('.add-category').modal('show');*/
    this.modalService.open(AddOfferComponent);
  }
  deleteId(list: any) {
    console.log(list);
    this.baseService.deleteById(this.currentApi + '/offer/' + list.id).subscribe((res: any) => {
      console.log(res);
      this.router.navigateByUrl('home/dashboard', { skipLocationChange: true }).then(() =>
        this.router.navigate(['home/offer']));
    });
  }
}
