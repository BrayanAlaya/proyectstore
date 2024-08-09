import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path: "", component: HomeComponent, children: [
      {path: "", loadChildren: () => import("./pages/main/main.module").then(m => m.MainModule)},
      {path: "user", loadChildren: () => import("../user/user.module").then(m => m.UserModule)}
    ]
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
