import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardDetailPage } from './dashboard-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardDetailPageRoutingModule {}
