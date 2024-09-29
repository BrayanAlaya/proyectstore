import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CartProductModule } from '../../components/cart-product/cart-product.module';

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    CartProductModule
  ],
  exports:[
    CartComponent
  ]
})
export class CartModule { }
