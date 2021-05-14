import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.page.html',
  styleUrls: ['./dashboard-detail.page.scss'],
})
export class DashboardDetailPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  gotoDashboard() {
    this.navCtrl.navigateBack('/home/dashboard');
  }

  gotoOption(){
    this.navCtrl.navigateForward('/home/dashboard/option');
  }

}
