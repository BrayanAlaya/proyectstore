import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _dbUrl: string

  constructor(
    private _http: HttpClient 
  ) {
    this._dbUrl = environment.apiUrl;
  }

  login(user: User): Observable<any>{
    return this._http.post(this._dbUrl + "/user/login",user)
  }

  update(user: FormData, token: any): Observable<any>{

    const headers = new HttpHeaders({
      "Authorization": token,
    })

    return this._http.put(this._dbUrl + "/user/update", user, {headers: headers})
  }

  delete(token: any): Observable<any>{
    const headers = new HttpHeaders({
      "Authorization": token,
    })

    return this._http.delete(this._dbUrl + "/user/delete", {headers: headers})
  }

  sendAuthCode(user: User):Observable<any>{
    return this._http.post(this._dbUrl + "/user/code/create-code", user)
  }

  authCode(user: User): Observable<any>{
    return this._http.post(this._dbUrl + "/user/code", user)
  }

  changePassword(user: User, token: any): Observable<any>{

    const headers = new HttpHeaders({
      'Authorization': token
    })

    return this._http.post(this._dbUrl + "/user/code/change-password", user, {headers: headers})
  }

  confirmValidAuthAccoutn(token: any): Observable<any>{

    const headers = new HttpHeaders({
      'Authorization': token
    })

    return this._http.post(this._dbUrl + "/user/code/auth-account", null ,{headers: headers})
  }

  register(user: User): Observable<any>{
    console.log(user)
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
