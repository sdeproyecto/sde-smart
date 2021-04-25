import { MenuController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<any>;
  isLoged = false;
  constructor(
    public menu: MenuController,
    public firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
    const auxLog = window.localStorage.getItem('phoneData');
    const auxLog2 = window.localStorage.getItem('fbKey');
    if (auxLog || auxLog2) {
      this.isLoged = true;
    }
    this.menu.close();
    this.menu.swipeGesture(false);
  }

  setLogin() {
    this.isLoged = true;
  }

  signup(email: string, password: string) {
    /*const firebaseAux = JSON.parse(window.localStorage.getItem('fbKey'));
    console.log(firebaseAux);
    firebase.initializeApp(firebaseAux);
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password);*/
  }

  login(email: string, password: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  forgot(email: string) {
    return this.firebaseAuth.auth.sendPasswordResetEmail(email);
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

  getActiveUser() {
    return this.firebaseAuth.auth.currentUser;
  }
}
