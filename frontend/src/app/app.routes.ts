import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { AdminComponent } from './component/admin/admin.component';
import { EditItemComponent } from './component/admin/edit-item/edit-item.component';
import { OrderItemComponent } from './component/admin/order-item/order-item.component';
import { AddressComponent } from './component/home/address/address.component';
import { CartItemComponent } from './component/home/cart-item/cart-item.component';
import { CheckoutComponent } from './component/home/checkout/checkout.component';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
import { authGuard } from './service/auth.guard';

export const routes: Routes = [
    { path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path:'login',
        component: LoginComponent
      },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'admin',
    component: AdminComponent
  },
  {
    path:'home',
    component: HomeComponent,
    canActivate:[authGuard]
  },
  {
    path:'home/cart',
    component: CartItemComponent,
    canActivate:[authGuard]
  },
  {
    path:'home/address',
    component: AddressComponent,
    canActivate:[authGuard]
  },
  {
    path:'admin/edit',
    component: EditItemComponent,
    canActivate:[authGuard]
  },
  {
    path:'admin/order',
    component: OrderItemComponent,
    canActivate:[authGuard]
  },
  {
    path:'home/order/checkout',
    component: CheckoutComponent,
    canActivate:[authGuard]
  },
];
