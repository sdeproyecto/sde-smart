import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardDetailPageRoutingModule } from './dashboard-detail-routing.module';

import { DashboardDetailPage } from './dashboard-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardDetailPageRoutingModule
  ],
  declarations: [DashboardDetailPage]
})
export class DashboardDetailPageModule {}
