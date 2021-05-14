import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardOptionPage } from './dashboard-option.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardOptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardOptionPageRoutingModule {}
