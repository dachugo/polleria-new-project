import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoCargandoPageRoutingModule } from './pedido-cargando-routing.module';

import { PedidoCargandoPage } from './pedido-cargando.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoCargandoPageRoutingModule
  ],
  declarations: [PedidoCargandoPage]
})
export class PedidoCargandoPageModule {}
