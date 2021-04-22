import { CustomersClientService } from './../services/fs-client/customers-client.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.page.html',
  styleUrls: ['./waiting.page.scss'],
})
export class WaitingPage implements OnInit {

  constructor(
    public cusService: CustomersClientService,
    public navCtrl: NavController) { }

  ngOnInit() {
    const aux1 = JSON.parse(window.localStorage.getItem('setWaiting'));
    if (!aux1) {
      const aux2 = JSON.parse(window.localStorage.getItem('phoneData'));
      this.cusService.setPhone(aux2);
      window.localStorage.setItem('setWaiting', '1');
    }

  }

  gotoLogin() {
    this.navCtrl.navigateRoot('/login');
  }

}
