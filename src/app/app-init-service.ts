import { CustomersClientService } from './services/fs-client/customers-client.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AppInitService {

    constructor(public cusService: CustomersClientService) {
    }

    Init() {

        return new Promise<void>((resolve, reject) => {
            console.log('AppInitService.init() called');
            const firebaseAux = JSON.parse(window.localStorage.getItem('fbKey'));
            if (firebaseAux && firebaseAux.apiKey) {
                setTimeout(() => {
                    this.cusService.getAlluserHelp().then((dat) => {
                        console.log('AppInitService Finished');
                        resolve();
                    });
                }, 300);
            } else {
                setTimeout(() => {
                    resolve();
                }, 300);
                resolve();
            }
        });
    }
}
