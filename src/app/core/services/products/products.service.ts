import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envo } from '../../../shared/env/envo';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly _HttpClient =inject(HttpClient)

  constructor() { }

  getallproducts():Observable<any>{
    return this._HttpClient.get(`${envo.baseurl}/api/v1/products`);

  }


  getspecificproduct(id:string):Observable<any>{
    return this._HttpClient.get(`${envo.baseurl}/api/v1/products/${id}`)
  }
}