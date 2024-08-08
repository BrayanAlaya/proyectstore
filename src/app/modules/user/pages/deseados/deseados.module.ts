import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeseadosRoutingModule } from './deseados-routing.module';
import { DeseadosComponent } from './deseados.component';


@NgModule({
  declarations: [
    DeseadosComponent
  ],
  imports: [
    CommonModule,
    DeseadosRoutingModule
  ]
})
export class DeseadosModule { }
