import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/core/models/Cart';
import { Product } from 'src/app/core/models/Product';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { CartService } from 'src/app/modules/purchases/services/cart/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product!: Product

  public s3Url: string
  public image!: string 

  constructor(
    private _userService: UserService,
    private _cartService: CartService,
  ){
    this.s3Url = environment.s3url
  }
  
  ngOnInit(): void {
    this.image = JSON.parse(this.product.image == undefined ? "" : this.product.image.toString())[0]
  }

  addCart(): void{
    const data: Cart = {
      amount: 1,
      product_id: this.product.id
    }

    this._cartService.save(data, this._userService.getLocalToken()).subscribe({
      next: (response: any) => {
      }
    })
  }

  viewStock(stock: number | undefined): boolean {
    
    if(stock != undefined && stock > 0){
      return true
    }
    
    return false
  }

}
