import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
// tslint:disable-next-line:import-blacklist
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
class Customer {
    // tslint:disable-next-line:variable-name
    public _id?: string;
    public id?: string;
    // tslint:disable-next-line:variable-name
    cod_cliente: string;
    nombre: string;
    // tslint:disable-next-line:variable-name
    razon_social: string;
    tel: string;
    direc: string;
    ciudad: string;
    pais: string;
    status: string;
    bd?: any;
}

@Injectable({
    providedIn: 'root'
})

export class CustomersClientService {
    private customers: Observable<Customer[]>;
    private Customer: Observable<Customer>;
    dataCustomer: any;
    private showLoading = new Subject();
    // tslint:disable-next-line:variable-name
    _showData = this.showLoading.asObservable();
    secondaryApp: any;
    dbSecondary: any;

    constructor() {
        const firebaseAux = JSON.parse(window.localStorage.getItem('fbKey'));
        console.log(firebaseAux);
        this.secondaryApp = firebase.initializeApp(firebaseAux, 'sds-cliente');
        this.dbSecondary = this.secondaryApp.firestore();
    }

    setDataHelp(data) {
        this.dataCustomer = data;
    }

    setDataObs(flag: any) {
        this.showLoading.next(flag);
    }

    getAllCustomers() {
        return this.dbSecondary.collection('clientes').get().then((querySnapshot) => {
            const aux = [];
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
                aux.push(doc.data());
            });
            // console.log(querySnapshot);
            return aux;
        });
    }

    signup(email, password) {
        console.log(this.secondaryApp.auth().currentUser);
        this.checkUser();
        return this.secondaryApp.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                console.log(userCredential.user);
                window.localStorage.setItem('saveUser', '1');
                return userCredential;
                // ...
            })
            .catch((error) => {
                console.error(error.code);
                // ..
            });
    }

    signin(email, password) {
        console.log(this.secondaryApp.auth().currentUser);
        this.checkUser();
        return this.secondaryApp.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                console.log('Signed in');
                console.log(userCredential.user);
                window.localStorage.setItem('saveUser', '1');
                return userCredential;
                // ...
            })
            .catch((error) => {
                console.error(error.code);
                // ..
            });
    }

    logOut(){
        return this.secondaryApp.auth().logout().then((dat) => {
            console.log(dat);
            return 'dat';
        });
    }

    checkUser() {
        this.secondaryApp.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user);
                // User is signed in.
            } else {
                console.log('no user');
                // No user is signed in.
            }
        });
    }

    buscarCustomer(search) {
        return this.dbSecondary.collection('clientes').where('cod_cliente', '==', search)
            .get()
            .then((querySnapshot) => {
                const aux = [];
                querySnapshot.forEach((doc) => {
                    console.log(doc.data());
                    aux.push(doc.data());
                });
                // console.log(querySnapshot);
                return aux;
            })
            .catch((error) => {
                console.log('Error getting documents: ', error);
            });
    }

    searchUser(search) {
        return this.dbSecondary.collection('usuarios').where('email', '==', search)
            .get()
            .then((querySnapshot) => {
                const aux = [];
                querySnapshot.forEach((doc) => {
                    console.log(doc.data());
                    aux.push(doc.data());
                });
                // console.log(querySnapshot);
                return aux;
            })
            .catch((error) => {
                console.log('Error getting documents: ', error);
            });
    }

    setPhone(obj) {
        // alert(JSON.stringify(obj));
        return this.dbSecondary.collection('telefonos').doc(obj.imei).set(obj)
            .then((docRef) => {
                console.log('Document written ');
            })
            .catch((error) => {
                console.error('Error adding document: ', error);
            });
    }
}
