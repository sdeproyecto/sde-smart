import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tablinks',
  templateUrl: './tablinks.page.html',
  styleUrls: ['./tablinks.page.scss'],
})
export class TablinksPage implements OnInit {
  @ViewChild('myTabs', { static: false }) tabRef: IonTabs;
  nameTab: string;
  // tslint:disable-next-line:variable-name
  has_loyalty = false;
  // tslint:disable-next-line:variable-name
  has_myspace = false;
  lang: any;
  showTabs: boolean;
  firstTab: { icon: string; label: any; key: string; };
  secondTab: { icon: string; label: string; key: string; };
  thirdTab: { icon: string; label: string; key: string; };
  fourthTab: { icon: string; label: any; key: string; };
  fifthTab: { icon: string; label: any; key: string; };

  constructor(
    public router: Router,
    public navCtrl: NavController) {
  }


  ngOnInit() {

  }


  openTab(tab, ev: MouseEvent) {
    if (ev) {
      // this.util.setHelpMySpace(true);
      ev.stopImmediatePropagation();
      ev.preventDefault();
      console.log(ev);
      // this.navCtrl.navigateRoot('home' + '/' + tab);
    }
  }

  getTab(ev: MouseEvent) {
    const aux = this.tabRef.getSelected();
    console.log(aux);
    this.nameTab = aux;
  }

}
