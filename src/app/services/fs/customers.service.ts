import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
// tslint:disable-next-line:import-blacklist
import { Subject } from 'rxjs';

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
}

@Injectable({
    providedIn: 'root'
})

export class CustomersService {
    private customersCollection: AngularFirestoreCollection<Customer>;
    private customers: Observable<Customer[]>;
    private customerDoc: AngularFirestoreDocument<Customer>;
    private Customer: Observable<Customer>;
    dataCustomer: any;
    private showLoading = new Subject();
    // tslint:disable-next-line:variable-name
    _showData = this.showLoading.asObservable();


    constructor(
        private afs: AngularFirestore) {
        this.customersCollection = this.afs.collection<Customer>('clientes');
        this.customers = this.customersCollection.valueChanges();
    }

    setDataHelp(data) {
        this.dataCustomer = data;
    }

    setDataObs(flag: any) {
        this.showLoading.next(flag);
    }


    getAllCustomers() {
        this.customersCollection = this.afs.collection<Customer>('clientes');
        return this.customers = this.customersCollection.snapshotChanges()
            .pipe(map(changes => {
                return changes.map(action => {
                    const data: any = action.payload.doc.data() as Customer;
                    return data;
                });
            }));
    }


    addCustomer(customer: Customer) {
        console.log(customer);
        const id = this.afs.createId();
        customer._id = id;
        this.customersCollection.doc(id).set({
            cod_cliente: customer.cod_cliente,
            nombre: customer.nombre,
            razon_social: customer.razon_social,
            tel: customer.tel,
            direc: customer.direc,
            pais: customer.pais,
            ciudad: customer.ciudad,
            status: customer.status
        })
            .then(() => {
                console.log(customer);
            })
            .catch((error) => {
                console.error('Error writing document: ', error);
            });
    }

    deleteCustomer(customer: Customer) {
        const id: string = customer._id;
        return this.afs.collection('clientes').doc(id).delete().then(() => {
        }).catch((error) => {
            console.error('Error writing document: ', error);
        });
    }

    desactiveCustomer(customer: Customer): void {
        const id: string = customer._id;
        this.customerDoc = this.afs.doc<Customer>(`clientes/${id}`);
        this.customerDoc.update({
            cod_cliente: customer.cod_cliente,
            nombre: customer.nombre,
            razon_social: customer.razon_social,
            tel: customer.tel,
            direc: customer.direc,
            pais: customer.pais,
            ciudad: customer.ciudad,
            status: customer.status
        })
            .then(() => {
            })
            .catch((error) => {
                console.error('Error writing document: ', error);
            });
    }

    updateCustomer(customer: Customer): void {
        const id: string = customer._id;
        console.log('updateCustomer: ', id);
        this.customerDoc = this.afs.doc<Customer>(`clientes/${id}`);
        this.customerDoc.update({
            cod_cliente: customer.cod_cliente,
            nombre: customer.nombre,
            razon_social: customer.razon_social,
            tel: customer.tel,
            direc: customer.direc,
            pais: customer.pais,
            ciudad: customer.ciudad,
            status: customer.status
        })
            .then(() => {
            })
            .catch((error) => {
                console.error('Error writing document: ', error);
            });
    }

    buscarCustomer(termino: string) {
        this.customersCollection = this.afs.collection<Customer>('clientes',
            ref => ref.orderBy('nombre')
                .startAt(termino));
        return this.customers = this.customersCollection.snapshotChanges()
            .pipe(map(changes => {
                return changes.map(action => {
                    const data = action.payload.doc.data() as Customer;
                    return data;
                });
            }));
    }

}
