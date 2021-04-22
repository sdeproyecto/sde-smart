import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CustomersClientService } from 'src/app/services/fs-client/customers-client.service';

@Component({
  selector: 'app-rondas',
  templateUrl: './rondas.page.html',
  styleUrls: ['./rondas.page.scss'],
})
export class RondasPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public customerService: CustomersClientService) { }

  ngOnInit() {
  }

  logout() {
    this.customerService.logOut().then(() => {
      window.localStorage.removeItem('validUser');
    });
    this.navCtrl.navigateRoot('/login');
  }

}
