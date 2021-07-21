import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../services/fs/customers.service';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.page.html',
  styleUrls: ['./waiting.page.scss'],
})
export class WaitingPage implements OnInit {
  toggleTextInterval = null;
  isValid: boolean;
  img: string;

  constructor(
    public cusService: CustomersService,
    public navCtrl: NavController) { }

  ngOnInit() {
    console.log('ngOnInit waiteingl');
    const aux1 = JSON.parse(window.localStorage.getItem('setWaiting'));
    if (!aux1) {
      const aux2 = JSON.parse(window.localStorage.getItem('phoneData'));
      this.cusService.setPhone(aux2);
      window.localStorage.setItem('setWaiting', '1');
    }
    const aux3 = JSON.parse(window.localStorage.getItem('phoneData'));
    if (aux3 && aux3.imei) {
      clearInterval(this.toggleTextInterval);
      this.toggleTextInterval = setInterval(() => {
        if (!this.isValid) {
          this.checkUser(aux3);
        }
      }, 5000);
    }

    const auxLogo = window.localStorage.getItem('logoClient');
    if (auxLogo) {
      this.img = auxLogo;
      this.cusService.getLogo().then((val) => {
        console.log('url2 ' + val);
        this.img = val;
        window.localStorage.setItem('logoClient', val);
      });
    } else {
      this.cusService.getLogo().then((val) => {
        console.log('url2 ' + val);
        this.img = val;
        window.localStorage.setItem('logoClient', val);
      });
    }
  }

  checkUser(aux3) {
    this.cusService.searchPhone(aux3.imei).then(val => {
      console.log('aux3 val', val);
      console.log(JSON.stringify(val));
      if (val && val.length > 0) {
        const aux = val[0];
        console.log(JSON.stringify(aux));
        if (aux.activo) {
          this.isValid = true;
          clearInterval(this.toggleTextInterval);
          this.navCtrl.navigateRoot('/login');
        }
      }
    });
  }

  gotoLogin() {
    this.navCtrl.navigateRoot('/login');
  }

}
