import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CustomersClientService } from 'src/app/services/fs-client/customers-client.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.page.html',
  styleUrls: ['./empleado.page.scss'],
})
export class EmpleadoPage implements OnInit {

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

