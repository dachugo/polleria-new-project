import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoCargandoPage } from './pedido-cargando.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoCargandoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoCargandoPageRoutingModule {}
