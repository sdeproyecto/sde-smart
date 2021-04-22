import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.page.html',
  styleUrls: ['./marcas.page.scss'],
})
export class MarcasPage implements OnInit {

  constructor(
    public navCtrl: NavController) { }

  ngOnInit() {
  }

  logout() {
    window.localStorage.removeItem('validUser');
    this.navCtrl.navigateRoot('/login');
  }

}
