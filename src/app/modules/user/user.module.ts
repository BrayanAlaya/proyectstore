import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SidevarComponent } from './components/sidevar/sidevar.component';
import { HomeuserComponent } from './pages/homeuser/homeuser.component';
import { SidevarModule } from './components/sidevar/sidevar.module';


@NgModule({
  declarations: [
    UserComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SidevarModule
  ]
})
export class UserModule { }
