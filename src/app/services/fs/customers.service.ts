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

export class CustomersService {
    private customers: Observable<Customer[]>;
    private Customer: Observable<Customer>;
    dataCustomer: any;
    private showLoading = new Subject();
    // tslint:disable-next-line:variable-name
    _showData = this.showLoading.asObservable();
    firebaseConfig = {
        apiKey: 'AIzaSyAvcZVDEIzhaqPHF7typYnlpguI3Zf0ca8',
        authDomain: 'sde-smart-app.firebaseapp.com',
        projectId: 'sde-smart-app',
        storageBucket: 'sde-smart-app.appspot.com',
        messagingSenderId: '356324128218',
        appId: '1:356324128218:web:d26053e0210e620695bce3',
        measurementId: 'G-H6DNP30F8Y'
    };
    primaryApp: any;
    dbPrimary: any;

    constructor() {
        this.primaryApp = firebase.initializeApp(this.firebaseConfig, 'sds-master');
        this.dbPrimary = this.primaryApp.firestore();
    }

    setDataHelp(data) {
        this.dataCustomer = data;
    }

    setDataObs(flag: any) {
        this.showLoading.next(flag);
    }

    getAllCustomers() {
        return this.dbPrimary.collection('clientes').get().then((querySnapshot) => {
            const aux = [];
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
                aux.push(doc.data());
            });
            // console.log(querySnapshot);
            return aux;
        });
    }

    setPhone(obj) {
        console.log(obj);
        console.log(JSON.stringify(obj));
        return this.dbPrimary.collection('telefonos').doc(obj.imei).set(obj)
            .then((docRef) => {
                console.log('Document written');
            })
            .catch((error) => {
                console.error('Error adding document: ', error);
            });
    }

    searchCustomer(search) {
        return this.dbPrimary.collection('clientes').where('cod_cliente', '==', search)
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

    getLogo() {
        const storage = this.primaryApp.storage();

        // Create a storage reference from our storage service
        const storageRef = storage.ref();
        const spaceRef = storageRef.child('app/logo.jpg');
        console.log('spaceRef');

        // Get the download URL
        return spaceRef.getDownloadURL().then((url) => {
            console.log('img');
            console.log(url);
            return url;
            // Insert url into an <img> tag to "download"
        }).catch((error) => {
            console.error(error);
        });
    }

    searchPhone(search) {
        return this.dbPrimary.collection('telefonos').where('imei', '==', search)
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
        return this.dbPrimary.collection('usuarios').where('email', '==', search)
            .get()
            .then((querySnapshot) => {
                const aux = [];
                querySnapshot.forEach((doc) => {
                    console.log(doc.data());
                    aux.push(doc.data());
                });
                console.log('aux getting ');
                return aux;
            })
            .catch((error) => {
                console.log('Error getting documents: ', error);
            });
    }


    signup(email, password) {
        console.log(this.dbPrimary.auth().currentUser);
        return this.dbPrimary.auth().createUserWithEmailAndPassword(email, password)
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
        console.log(this.dbPrimary.auth().currentUser);
        return this.dbPrimary.auth().signInWithEmailAndPassword(email, password)
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

    logOut() {
        return this.dbPrimary.auth().logout().then((dat) => {
            console.log(dat);
            return 'dat';
        });
    }
}
