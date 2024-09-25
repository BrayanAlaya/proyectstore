import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: "", component: HomeComponent, children: [
      {path: "", loadChildren: () => import("./pages/main/main.module").then(m => m.MainModule)},
      {path: "user", loadChildren: () => import("../user/user.module").then(m => m.UserModule)},
      {path: "products", loadChildren: ()=> import("../products/pages/products/products.module").then(m => m.ProductsModule)},
      {path: "product", loadChildren: ()=> import("../products/pages/product-detail/product-detail.module").then(m => m.ProductDetailModule)}
    ]
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
