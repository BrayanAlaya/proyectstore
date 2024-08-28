import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/Product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _dbUrl: string

  constructor(
    private _http: HttpClient
  ) { 
    this._dbUrl = environment.apiUrl
  }

  create(product: FormData, token: any): Observable<any>{

    const headers = new HttpHeaders().set("Authorization", token)

    return this._http.post(this._dbUrl + "/product/", product, {headers: headers})
  }

}
