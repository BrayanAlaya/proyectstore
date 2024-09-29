import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wishlist } from 'src/app/core/models/Wishlist';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private _dbUrl: string 

  constructor(
    private _http: HttpClient,
  ) { 
    this._dbUrl = environment.apiUrl + "/wishlist"
  }

  save(data: Wishlist, token: any): Observable<any>{

    const headers = new HttpHeaders().set("Authorization", token)

    return this._http.post(this._dbUrl,data,{headers: headers})
  }

}
