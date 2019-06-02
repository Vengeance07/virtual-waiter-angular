import {Component, DoCheck, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {Pageable} from "../../services/pageable";
import {DataService} from "../../services/dataService";
import {BaseService} from "../../services/baseService";
import {Pagination} from "../../services/pagination";
import {Router} from "@angular/router";
import {Category} from "../../modal/category";
import {AddCategoryComponent} from "./add-category/add-category.component";

declare var $;
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, DoCheck {

  dataList: any;
  spinner: boolean = false;
  globalMsg;
  search: any = {};
  pageable: Pageable = new Pageable();
  currentApi: any;
  activeCount: any;
  inactiveCount: any;
  category: Category = new Category();
  public popoverTitle: string = 'Delete';
  public popoverMessage: string = 'Are you sure you want to delete?';
  public cancelClicked: boolean = false;
  // Image: string = this.dataList.photo_path;

  constructor(
    private dataService: DataService,
    private baseService: BaseService,
    private paginationService: Pagination,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.currentApi = 'v1';
    this.baseService.getByAll(this.currentApi + '/category').subscribe((response: any) => {
      this.dataList = response;

      this.dataService.setDataList(this.dataList);
      console.log(this.dataList);
      this.spinner = false;
    });
  }
  ngDoCheck(): void {
    this.dataList = this.dataService.getDataList();
  }
  openEdit(category: Category) {
    this.dataService.setCategory(category);
    this.modalService.open(AddCategoryComponent);
  }
  deleteId(list: any) {
    console.log(list);
    this.baseService.deleteById(this.currentApi + '/category/' + list.id).subscribe((res: any) => {
      console.log(res);
      this.router.navigateByUrl('home/dashboard', { skipLocationChange: true }).then(() =>
        this.router.navigate(['home/category']));
    });
  }
  addCategory() {
    this.dataService.setCategory(new Category());
    /*$('.add-category').modal('show');*/
    this.modalService.open(AddCategoryComponent);
  }


}
