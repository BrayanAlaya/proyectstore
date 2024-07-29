import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgetRoutingModule } from './forget-routing.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { ForgetComponent } from './forget.component';


@NgModule({
  declarations: [
    ForgetComponent
  ],
  imports: [
    CommonModule,
    ForgetRoutingModule,
    NavbarModule
  ]
})
export class ForgetModule { }
