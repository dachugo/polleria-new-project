import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartPayPage } from './cart-pay.page';

const routes: Routes = [
  {
    path: '',
    component: CartPayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartPayPageRoutingModule {}
