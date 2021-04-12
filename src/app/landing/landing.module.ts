import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandingPageRoutingModule } from './landing-routing.module';

import { LandingPage } from './landing.page';
import { ServiceModule } from '../services/fs/fs-services.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ServiceModule,
    FormsModule,
    IonicModule,
    LandingPageRoutingModule
  ],
  providers: [],
  declarations: [LandingPage]
})
export class LandingPageModule {}
