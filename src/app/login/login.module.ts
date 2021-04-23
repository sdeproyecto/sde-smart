import { ServiceClientModule } from './../services/fs-client/fs-services.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
const firebaseAux = JSON.parse(window.localStorage.getItem('fbKey'));
console.log(firebaseAux);

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  providers: [AngularFirestore],
  declarations: [LoginPage]
})
export class LoginPageModule {}
