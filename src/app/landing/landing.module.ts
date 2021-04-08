import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandingPageRoutingModule } from './landing-routing.module';

import { LandingPage } from './landing.page';
import { AngularFireModule } from '@angular/fire';
const firebaseAux = {
  apiKey: 'AIzaSyD9V8YFIML3ymn1jwpjRIA6flT7zSR66zA',
  authDomain: 'sde-master.firebaseapp.com',
  projectId: 'sde-master',
  storageBucket: 'sde-master.appspot.com',
  messagingSenderId: '1034297079589',
  appId: '1:1034297079589:web:12976899f49bcca63a8ccc',
  measurementId: 'G-9EG0BX2DY6'
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularFireModule.initializeApp(firebaseAux),
    LandingPageRoutingModule
  ],
  declarations: [LandingPage]
})
export class LandingPageModule {}
