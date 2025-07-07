import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayMethodPage } from './pay-method.page';

const routes: Routes = [
  {
    path: '',
    component: PayMethodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayMethodPageRoutingModule {}
