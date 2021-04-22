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
        apiKey: 'AIzaSyD9V8YFIML3ymn1jwpjRIA6flT7zSR66zA',
        authDomain: 'sde-master.firebaseapp.com',
        projectId: 'sde-master',
        storageBucket: 'sde-master.appspot.com',
        messagingSenderId: '1034297079589',
        appId: '1:1034297079589:web:1297',
        measurementId: 'G-9EG0BX2DY6'
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
        alert(JSON.stringify(obj));
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
}
