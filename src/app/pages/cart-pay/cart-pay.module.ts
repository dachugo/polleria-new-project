import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPayPageRoutingModule } from './cart-pay-routing.module';

import { CartPayPage } from './cart-pay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPayPageRoutingModule
  ],
  declarations: [CartPayPage]
})
export class CartPayPageModule {}
