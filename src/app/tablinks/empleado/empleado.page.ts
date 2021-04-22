import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.page.html',
  styleUrls: ['./empleado.page.scss'],
})
export class EmpleadoPage implements OnInit {

  constructor(
    public navCtrl: NavController) { }

  ngOnInit() {
  }

  logout() {
    window.localStorage.removeItem('validUser');
    this.navCtrl.navigateRoot('/login');
  }

}

