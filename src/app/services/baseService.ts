import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestApiService } from './rest-api';
import { Pageable } from './pageable';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  modelList: any;
  pageable: Pageable = new Pageable();

  constructor(private http: HttpClient,
              private restApiService: RestApiService) {
  }

  // saveOrEdit(model: Object,reqUrl): Observable<Object> {
  //     let url: string = reqUrl;
  //     let getUrl = this.restApiService.modifyRestUrl(url);
  //     return this.http.post(getUrl.url, model, { headers: getUrl.header });
  //   }


  //   getById(reqUrl): Observable<Object> {
  //     let url: string = reqUrl;
  //     let getUrl = this.restApiService.modifyRestUrl(url);

  //     return this.http.get(getUrl.url, { headers: getUrl.header });
  //   }

  //   getByAll(reqUrl): Observable<Object> {
  //     let url: string = reqUrl;
  //     let getUrl = this.restApiService.modifyRestUrl(url);

  //     return this.http.get(getUrl.url,{ headers: getUrl.header });
  //   }

  //   getByAllPostPageable(reqUrl,model,page,size) {
  //     let url: string = reqUrl+'?page='+page+'&size='+size;
  //     let getUrl = this.restApiService.modifyRestUrl(url);
  //    return  this.http.post(getUrl.url,model,{ headers: getUrl.header });

  //   }

  saveOrEdit(model: Object, reqUrl): Observable<Object> {
    let url: string = reqUrl;
    let getUrl = this.restApiService.modifyRestUrl(url);
    return this.http.post(getUrl.url, model);
  }

  getByPost(model: Object, reqUrl, models) {
    let url: string = reqUrl;
    let getUrl = this.restApiService.modifyRestUrl(url);
    return this.http.post(getUrl.url, model, models);
  }


  getById(reqUrl): Observable<Object> {
    let url: string = reqUrl;
    let getUrl = this.restApiService.modifyRestUrl(url);
    return this.http.get(getUrl.url);
  }

  deleteById(reqUrl): Observable<Object> {
    let url: string = reqUrl;
    let getUrl = this.restApiService.modifyRestUrl(url);
    return this.http.delete(getUrl.url);
  }

  getByAll(reqUrl): Observable<Object> {
    let url: string = reqUrl;
    let getUrl = this.restApiService.modifyRestUrl(url);
    return this.http.get(getUrl.url);
  }

  getByPostAllPageable(reqUrl, model, page, size) {
    let url: string = reqUrl + '?page=' + page + '&size=' + size;
    let getUrl = this.restApiService.modifyRestUrl(url);
    return this.http.post(getUrl.url, model);

  }

  postFile(model, fileToUpload: File) {
    const endpoint = 'http://http://localhost:8086/v1/category';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('empJson', model);
    return this.http.post(endpoint, formData);
  }




}


