import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component'
import { CartComponent } from './cart/cart.component';
import {HomeComponent} from './home/home.component';
import {LoginGuardService} from './app-guard';
import { ProductComponent } from './product/product.component';
import { WishlistComponent } from './wishlist/wishlist.component';
// import { from } from 'rxjs';
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'signup',component:SignupComponent},
  {path:'cart',
  component:CartComponent,canActivate:[LoginGuardService]
  
},
{path:'home',component:HomeComponent,canActivate:[LoginGuardService]},
{ path: 'product/:id', component: ProductComponent,canActivate:[LoginGuardService]},
{path:'wishlist',component:WishlistComponent,canActivate:[LoginGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// 