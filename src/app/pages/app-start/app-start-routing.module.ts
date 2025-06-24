import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppStartPage } from './app-start.page';

const routes: Routes = [
  {
    path: '',
    component: AppStartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppStartPageRoutingModule {}
