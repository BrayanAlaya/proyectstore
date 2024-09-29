import { Component, Input } from '@angular/core';
import { Cart } from 'src/app/core/models/Cart';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss']
})
export class CartProductComponent {

  @Input() product!: Cart

  public s3Url: string
  public image!: string 

  constructor(
    
  ){
    this.s3Url = environment.s3url
  }
  
  ngOnInit(): void {
    this.image = JSON.parse(this.product.products?.image == undefined ? "" : this.product.products?.image.toString())[0]
  }

  addCart(): void{

  }

}
