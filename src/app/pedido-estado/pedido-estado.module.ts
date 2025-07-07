import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoEstadoPageRoutingModule } from './pedido-estado-routing.module';

import { PedidoEstadoPage } from './pedido-estado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoEstadoPageRoutingModule
  ],
  declarations: [PedidoEstadoPage]
})
export class PedidoEstadoPageModule {}
