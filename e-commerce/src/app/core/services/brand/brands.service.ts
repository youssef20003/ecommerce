import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { envo } from '../../../shared/env/envo';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private readonly _HttpClient = inject(HttpClient)

  constructor() { }
  getallbrands():Observable<any>{
    return this._HttpClient.get(`${envo.baseurl}/api/v1/brands`)
  }
}
