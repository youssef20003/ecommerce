import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envo } from '../../../shared/env/envo';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userinfo: any;

  decodedtoken(){
    if(sessionStorage.getItem('token')){
      this.userinfo = jwtDecode(sessionStorage.getItem('token') !)
    }
  }

  constructor(private _HttpClient : HttpClient) { }

  signup(data:object):Observable<any>{
    return this._HttpClient.post(`${envo.baseurl}/api/v1/auth/signup` ,data)
  }
  signin(data:object):Observable<any>{
    return this._HttpClient.post(`${envo.baseurl}/api/v1/auth/signin` ,data)
  }
}