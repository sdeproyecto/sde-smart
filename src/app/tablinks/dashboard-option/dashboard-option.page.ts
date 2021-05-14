import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-option',
  templateUrl: './dashboard-option.page.html',
  styleUrls: ['./dashboard-option.page.scss'],
})
export class DashboardOptionPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  gotoDashboard() {
    this.navCtrl.navigateBack('/home/dashboard/detail');
  }


}
