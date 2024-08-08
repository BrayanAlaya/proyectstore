import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: "", component: UserComponent, children: [
      {path: "", loadChildren: ()=> import("./pages/homeuser/homeuser.module").then(m => m.HomeuserModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
