import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Pageable } from './pageable';
import {Category} from "../modal/category";
import {Menu} from "../modal/menu";
import {Type} from "../modal/type";
import {User} from "../modal/user";
import {Employee} from "../modal/employee";
import {EmpPosition} from "../modal/empPosition";
import {Offer} from "../modal/offer";
/*import { Branch } from '../../modal/branch';*/




@Injectable({
  providedIn: 'root'
})
export class DataService {
  title: string;
  data: any;
  dataObj: any;

 /* branch: Branch = new Branch();*/
  category: Category = new Category();
  menu: Menu = new Menu();
  type: Type = new Type();
  user: User = new User();
  position: EmpPosition = new EmpPosition();
  employee: Employee = new Employee();
  offer: Offer = new Offer();

  private breadcrumTitle = new BehaviorSubject('default message');
  currentTitle = this.breadcrumTitle.asObservable();

  private message = new BehaviorSubject('default message');
  currentMsg = this.message.asObservable();

  private alertFlag = new BehaviorSubject('default');
  currentAlertFlag = this.alertFlag.asObservable();

  constructor() {
  }

  changeTitle(message: string) {
    this.breadcrumTitle.next(message)
  }

  getGlobalMsg(message: string) {
    this.message.next(message)
  }

  getAlertMsg(flag: string) {

    this.alertFlag.next(flag);
  }



  setDataList(datalist: Object) {
    this.data = datalist;
  }

  getDataList() {
    return this.data;
  }

  setData(dataObj: any) {
    this.dataObj = dataObj;
  }

  getData() {
    return this.dataObj;
  }

  /*setBranch(branch: Branch) {
    console.log(branch)
    this.branch = branch;
  }

  getBranch() {
    return this.branch;
  }*/

  setCategory(category: Category){
    console.log(category);
    this.category = category;
  }
  getCategory(){
    return this.category;
  }

  setMenu(menu: Menu){
    console.log(menu);
    this.menu = menu;
  }
  getMenu(){
    return this.menu;
  }
  setType(type: Type){
    console.log(type);
    this.type = type;
  }
  getType(){
    return this.type;
  }
  setUser(user: User){
    console.log(user);
    this.user = user;
  }
  getUser(){
    return this.user;
  }
  setPosition(position: EmpPosition){
    console.log(position);
    this.position = position;
  }
  getPosition(){
    return this.position;
  }
  setEmployee(employee: Employee){
    console.log(employee);
    this.employee = employee;
  }
  getEmployee(){
    return this.employee;
  }
  setOffer(offer: Offer){
    this.offer = offer;
  }
  getOffer(){
    return this.offer;
  }
}
