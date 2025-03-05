import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envo } from '../../../shared/env/envo';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _HttpClient :HttpClient) { }

  getallcategories():Observable<any>{
    return this._HttpClient.get(`${envo.baseurl}/api/v1/categories`)

  }
}
