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
    public firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
    const auxLog = window.localStorage.getItem('loginUser');
    if (auxLog) {
      this.isLoged = true;
    }
  }

  setLogin() {
    this.isLoged = true;
  }

  signup(email: string, password: string) {
    const firebaseAux = JSON.parse(window.localStorage.getItem('fbKey'));
    console.log(firebaseAux);
    firebase.initializeApp(firebaseAux);
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
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
