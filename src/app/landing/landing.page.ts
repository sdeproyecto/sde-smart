import { EventsService } from './../services/events.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavParams, NavController, PopoverController, LoadingController, ToastController, Platform, AlertController, MenuController } from '@ionic/angular';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  providers: [NavParams]
})
export class LandingPage implements OnInit {
  todo: FormGroup;
  user: any;
  // tslint:disable-next-line:variable-name
  token_id: any;
  loader: any;
  loadingPic: HTMLIonLoadingElement;
  hasPermission: boolean;
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public events: EventsService,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public alertCtrl: AlertController,
    public menu: MenuController,
    public util: UtilService) {
    this.menu.close();
    this.menu.swipeGesture(false);

    this.todo = this.formBuilder.group({
      username: ['', Validators.required],
      // categoria: [''],
      password: ['']
    });


  }

  ngOnInit() {
    console.log('ngOnInit LoginPage');
  }

  login() {
    // this.navCtrl.setRoot(HomePage);// quitar
    // alert('this.token_id ' + this.token_id);
    let login: any;
    const band = true;
    this.eneLoadingPic();
    login = {
    };
    console.log('0 LoginPage');
  }

  gotoRegister() {
    this.navCtrl.navigateForward('/register');
  }

  async eneLoadingPic() {
    this.loadingPic = await this.loadingCtrl.create({
      message: 'Espere',
      // duration: 2000
    });
    await this.loadingPic.present();
  }

  async goToContac() {
    console.log('goToContac');

  }

  async onShowOptions(ev: MouseEvent) {

  }



}

