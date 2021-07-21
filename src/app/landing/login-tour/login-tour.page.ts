import { Component, OnInit } from '@angular/core';
import {
  NavController, LoadingController, AlertController, ToastController,
  Platform, MenuController, ModalController, NavParams, IonSlides
} from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login-tour',
  templateUrl: './login-tour.page.html',
  styleUrls: ['./login-tour.page.scss'],
})
export class LoginTourPage implements OnInit {
  loadingPic: HTMLIonLoadingElement;
  isMobile = false;
  tour: any[] = [];
  slideOpts1: any;
  isEnd: boolean;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastController: ToastController,
    public plarform: Platform,
    public menu: MenuController,
    public modalController: ModalController,
    public navParams: NavParams
  ) {
    this.menu.close();
    this.menu.swipeGesture(false);
    this.toastController.create({ animated: false }).then(t => { t.present(); t.dismiss(); });
    if (this.plarform.is('ios') || this.plarform.is('android')) {
      this.isMobile = true;
    }
    this.slideOpts1 = {
      speed: 400,
      effect: 'slide',
      centeredSlides: true,
      loop: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets'
      }
    };
  }

  ionViewWillEnter() {
    this.menu.close();
    console.log('ionViewWillEnter');
  }


  ngOnInit() {
    this.initLogin();
  }


  initLogin() {
    this.tour = this.navParams.get('dataTour');
    console.log(this.tour);
    for (const ita of this.tour) {
    }
  }

  nextS(slide: IonSlides) {
    slide.slideNext();
  }

  slideChanged(slide: IonSlides) {
    console.log(' slideChanged');
    slide.isEnd().then((val) => {
      console.log(' isEnd + ' + val);
      this.isEnd = val;
    });
    slide.getActiveIndex().then((val) => {
      console.log(' slide + ' + val);
    });
  }

  next() {
    this.modalController.dismiss(true);
  }

  async presentToast(msg: any, color?) {
    let colorT = 'dark';
    if (color) {
      colorT = color;
    }
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: colorT
    });
    toast.present();
  }

  async eneLoadingPic() {
    this.loadingPic = await this.loadingCtrl.create({
      message: 'Espere...',
      // duration: 2000
    });
    await this.loadingPic.present();
  }

  onResize(event) {
    try {
      if (event.target.innerWidth < 800) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    } catch (error) {
      console.log(error);
    }
  }

}
