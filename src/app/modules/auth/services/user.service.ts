import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public _dbUrl: string

  constructor(
    private _http: HttpClient 
  ) {
    this._dbUrl = environment.apiUrl;
  }

  login(user: User): Observable<any>{
    return this._http.post(this._dbUrl + "/user/login",user)
  }

  register(user: User): Observable<any>{
    return this._http.post(this._dbUrl + "/user/register",user)
  }

  getLocalUSer():User | null  {

    if(localStorage.getItem("user") == null){
      return null
    }

    return JSON.parse(localStorage.getItem("user") ?? "");
  }
  getLocalToken():String | null  {

    return localStorage.getItem("token");
  }
}
