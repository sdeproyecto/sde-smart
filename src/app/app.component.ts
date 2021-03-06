import { Platform } from '@ionic/angular';
import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public platform: Platform,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar) {

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('ios')) {
        this.statusBar.styleBlackTranslucent();
      } else {
        this.statusBar.backgroundColorByHexString('#6182f5');
        this.statusBar.styleBlackTranslucent();
      }
      this.splashScreen.hide();
    });
  }
}
