import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-rondas',
  templateUrl: './rondas.page.html',
  styleUrls: ['./rondas.page.scss'],
})
export class RondasPage implements OnInit {

  constructor(
    public navCtrl: NavController) { }

  ngOnInit() {
  }

  logout() {
    window.localStorage.removeItem('validUser');
    this.navCtrl.navigateRoot('/login');
  }

}
