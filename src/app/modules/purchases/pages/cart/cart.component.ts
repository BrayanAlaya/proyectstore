import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { CartService } from '../../services/cart/cart.service';
import { PurchaseService } from '../../services/purchase/purchase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{

  public products$ : Observable<any> = new Observable<any>

  constructor(
    private _userService: UserService,
    private _cartService: CartService,
    private _purchaseService: PurchaseService
  ){

  }

  ngOnInit(): void {
    this.products$ = this._cartService.get(this._userService.getLocalToken())
  }

}
