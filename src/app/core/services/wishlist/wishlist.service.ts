import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { envo } from '../../../shared/env/envo';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishcount: BehaviorSubject<number> = new BehaviorSubject(0);
  usertoken !: any
  constructor(private _HttpClient: HttpClient, @Inject(PLATFORM_ID) private _PLATFORM_ID: any) {
    if(isPlatformBrowser(this._PLATFORM_ID)){
      this.usertoken = { token: sessionStorage.getItem('token') }
    }
    else{
      this.usertoken = { token: null }
    }
  }

  Addproducttowishlist(p_id: string): Observable<any> {

    return this._HttpClient.post(`${envo.baseurl}/api/v1/wishlist`, { "productId": p_id }, { headers:  this.usertoken  })

  }
  Getloggeduserwishlist(): Observable<any> {

    return this._HttpClient.get(`${envo.baseurl}/api/v1/wishlist`, { headers:  this.usertoken  })

  }
  Removeproductfromwishlistt(p_id: string): Observable<any> {

    return this._HttpClient.delete(`${envo.baseurl}/api/v1/wishlist/${p_id}`, { headers: this.usertoken  })

  }
}
