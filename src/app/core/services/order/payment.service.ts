import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { envo } from '../../../shared/env/envo';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  usertoken: any


  constructor(private _HttpClient: HttpClient, @Inject(PLATFORM_ID) private _PLATFORM_ID: any) {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.usertoken = { token: sessionStorage.getItem('token') }
    }
    else {
      this.usertoken = { token: null }
    }
  }

  checkoutsession(c_id: string, data: object): Observable<any> {
    return this._HttpClient.post(`${envo.baseurl}/api/v1/orders/checkout-session/${c_id}?url=${envo.url}`,
      { 'shippingAddress': data },
      { headers: this.usertoken }

    )
  }
}
