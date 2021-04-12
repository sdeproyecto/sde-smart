import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.page.html',
  styleUrls: ['./waiting.page.scss'],
})
export class WaitingPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  gotoLogin() {
    this.navCtrl.navigateRoot('/login');
  }

}
