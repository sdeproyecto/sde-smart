import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  gotoDetail() {
    this.navCtrl.navigateForward('/home/dashboard/detail');
  }

}
