import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthCodeComponent } from './pages/auth-code/auth-code.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  // {path: "", loadChildren: ()=> import("./pages/login/login.module").then(m => m.LoginModule)},
  // {path: "register", loadChildren: ()=> import("./pages/register/register.module").then(m => m.RegisterModule)},
  // {path: "change_password", loadChildren: ()=> import("./pages/forget/forget.module").then(m => m.ForgetModule)},
  // {path: "auth_account", loadChildren: ()=> import("./pages/auth_account/auth-account.module").then(m => m.AuthAccountModule)},
  // {path: "auth_code", loadChildren: ()=> import("./pages/auth-code/auth-code.module").then(m => m.AuthCodeModule)},
  // {path: "**", redirectTo:"", pathMatch:"full"}

  {
    path: "", component: AuthComponent, children: [
      { path: "", loadChildren: () => import("./pages/login/login.module").then(m => m.LoginModule) },
      { path: "register", loadChildren: () => import("./pages/register/register.module").then(m => m.RegisterModule) },
      { path: "change_password", loadChildren: () => import("./pages/forget/forget.module").then(m => m.ForgetModule) },
      { path: "auth_account", loadChildren: () => import("./pages/auth_account/auth-account.module").then(m => m.AuthAccountModule) },
      { path: "auth_code", loadChildren: () => import("./pages/auth-code/auth-code.module").then(m => m.AuthCodeModule) },
      { path: "**", redirectTo: "", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
