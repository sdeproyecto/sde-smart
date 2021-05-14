import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardOptionPageRoutingModule } from './dashboard-option-routing.module';

import { DashboardOptionPage } from './dashboard-option.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardOptionPageRoutingModule
  ],
  declarations: [DashboardOptionPage]
})
export class DashboardOptionPageModule {}
