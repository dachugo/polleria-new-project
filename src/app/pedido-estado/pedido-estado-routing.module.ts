import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoEstadoPage } from './pedido-estado.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoEstadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoEstadoPageRoutingModule {}
