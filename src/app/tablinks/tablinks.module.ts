import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TablinksPage } from './tablinks.page';
import { TablinksPageRoutingModule } from './tablinks-routing.module';
import { HttpClient } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablinksPageRoutingModule
  ],
  declarations: [TablinksPage]
})
export class TablinksPageModule {}
