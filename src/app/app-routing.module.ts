import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  {path:"auth", loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule)},
  {path: "", loadChildren: () => import("./modules/home/home.module").then(m => m.HomeModule)},
  {path: "user", loadChildren: () => import("./modules/user/user.module").then(m => m.UserModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}