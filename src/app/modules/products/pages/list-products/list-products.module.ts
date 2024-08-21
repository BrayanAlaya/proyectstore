import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListProductsRoutingModule } from './list-products-routing.module';
import { ListProductsComponent } from './list-products.component';


@NgModule({
  declarations: [
    ListProductsComponent
  ],
  imports: [
    CommonModule,
    ListProductsRoutingModule
  ],
  exports: [
    ListProductsComponent
  ]
})
export class ListProductsModule { }
