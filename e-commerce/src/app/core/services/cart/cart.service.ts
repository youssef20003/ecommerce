import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { envo } from '../../../shared/env/envo';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartcount: BehaviorSubject<number> = new BehaviorSubject(0)


  usertoken: any 

  constructor(private _HttpClient: HttpClient, @Inject(PLATFORM_ID) private _PLATFORM_ID: any) {
    if(isPlatformBrowser(this._PLATFORM_ID)){
      this.usertoken = { token: sessionStorage.getItem('token') }
    }
    else{
      this.usertoken = { token: null }
    }
  }

  GetLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(`${envo.baseurl}/api/v1/cart`, { headers:  this.usertoken })
  };

  AddProductToCart(p_id: string): Observable<any> {

    return this._HttpClient.post(`${envo.baseurl}/api/v1/cart`, { "productId": p_id }, { headers:   this.usertoken  })

  }

  RemovespecificcartItem(p_id: string): Observable<any> {
    return this._HttpClient.delete(`${envo.baseurl}/api/v1/cart/${p_id}`, { headers:  this.usertoken  });
  }

  updatecartproductquantity(p_id: string, count: number): Observable<any> {
    return this._HttpClient.put(`${envo.baseurl}/api/v1/cart/${p_id}`, { "count": count }, { headers:   this.usertoken  })
  }

  clearcart(): Observable<any> {
    return this._HttpClient.delete(`${envo.baseurl}/api/v1/cart`, { headers:   this.usertoken  })
  }



}