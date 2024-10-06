import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { CartService } from '../../services/cart/cart.service';
import { PurchaseService } from '../../services/purchase/purchase.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/states/app.state';
import { loadCart } from 'src/app/states/cart/cart.actions';
import { selectCart } from 'src/app/states/cart/cart.selectors';
import { BuyModalComponent } from '../../components/buy-modal/buy-modal.component';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmLogComponent } from 'src/app/modules/products/components/confirm-log/confirm-log.component';
import { CartState } from 'src/app/core/models/Cart.state';
import { Cart } from 'src/app/core/models/Cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: Array<Cart> = [] 
  public total: number = 0
  public quantity: number = 0

  constructor(
    private _userService: UserService,
    private _purchaseService: PurchaseService,
    private _store: Store<AppState>,
    public dialog: MatDialog
  ) {
    this._store.dispatch(loadCart({ token: this._userService.getLocalToken()?.toString() ?? "" }))
    this._store.select(selectCart).subscribe({
      next: (r:any) => {
        this.total = 0
        this.quantity = 0
        this.products = r.cart

        this.products.forEach(data => {
          this.total += (data.products?.price ?? 0) * (data.amount ?? 0)
          this.quantity += (data.amount ?? 0)
        })
      }
    })
  }

  ngOnInit(): void {

    

  }

  buy(): void {
    this.dialog.open(BuyModalComponent, {
      width: '300px',
      height: '490px'
    });
  }

}
