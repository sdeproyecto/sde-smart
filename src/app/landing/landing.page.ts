import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AuthService } from './../services/auth.service';
import { CustomersService } from './../services/fs/customers.service';
import { EventsService } from './../services/events.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {
  NavParams, NavController, PopoverController, LoadingController,
  ToastController, Platform, AlertController, MenuController, ModalController
} from '@ionic/angular';
import { UtilService } from '../services/util.service';
import { Device } from '@ionic-native/device/ngx';
import { LoginTourPage } from './login-tour/login-tour.page';

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
  customers: any[];
  timeout = null;
  codValid: boolean;
  isSearching: boolean;
  auxBd: any;
  phoneData: any;
  load: boolean;
  img: string;

  constructor(
    public navCtrl: NavController,
    public googlePlus: GooglePlus,
    public modalController: ModalController,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    public events: EventsService,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public customersService: CustomersService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public alertCtrl: AlertController,
    public menu: MenuController,
    public device: Device,
    public fb: Facebook,
    public util: UtilService) {
    this.menu.close();
    this.menu.swipeGesture(false);
    this.codValid = true;
    this.auxBd = 'val[0].bd';
  }

  private iniForm() {
    this.todo = this.formBuilder.group({
      cod_cliente: [''],
      lastname: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      clave: ['', Validators.required],
      repclave: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log('ngOnInit LoginPage');
    const auxLogo = window.localStorage.getItem('logoSDS');


    this.phoneData = {
      imei: this.device.uuid,
      modelo: this.device.model,
      marca: this.device.manufacturer,
      plataforma: this.device.platform,
      version: this.device.version
    };
    console.log('here', this.phoneData);
    const auxHelp = [
      {
        title: 'lorep title 1',
        description: 'loremp desc loremploremp loremp loremp loremp loremp',
        image: 'assets/imgs/tour1.svg'
      },
      {
        title: 'lorep title 2',
        description: 'loremp desc loremploremp loremp loremp loremp loremp',
        image: 'assets/imgs/tour2.svg'
      },
      {
        title: 'lorep title 3',
        description: 'loremp desc loremploremp loremp loremp loremp loremp',
        image: 'assets/imgs/tour3.svg'
      }
    ];
    this.customersService.searchPhone(this.phoneData.imei).then(val => {
      console.log(' val', val);
      if (val && val.length > 0) {
        const aux = val[0];
        console.log(JSON.stringify(aux));
        this.navCtrl.navigateRoot('/login');
      } else {
        this.manageTour(auxHelp);
        this.phoneData.activo = false;
        this.iniForm();
      }
      this.load = true;
    });

  }

  async manageTour(dataTour) {
    const modal = await this.modalController.create({
      component: LoginTourPage,
      componentProps: { dataTour },
      backdropDismiss: false
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log('from LoginTourPage', data);
    if (data) {
      // this.storage.set('appTour', true).catch((err) => console.log(err));
    }
  }

  getAllcustomers() {
    this.customersService.getAllCustomers().then(values => {
      // this.customers = values;
      console.log(' this.customers', values);
    });
  }



  async reg() {
    if (this.todo.valid) {
      if (this.todo.value.clave !== this.todo.value.repclave) {
        const toast = await this.toastCtrl.create({
          message: 'La clave no son iguales',
          duration: 3000,
          color: 'danger'
        });
        toast.present();
        return;
      }
      const loading = await this.loadingCtrl.create({
        message: 'Espere...'
      });
      await loading.present();
      const body = {
        email: this.todo.value.email,
        name: this.todo.value.name,
        lastname: this.todo.value.lastname,
        password: this.todo.value.clave,
        imei: this.device.uuid,
        modelo: this.device.model,
        marca: this.device.manufacturer,
        plataforma: this.device.platform,
        version: this.device.version,
        tipo: 'APP_smart'
      };
      this.authService.signup(body.email, body.password).then(async (dat) => {
        console.log(dat);
        this.customersService.setPhone(body);
        loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Bienvenido',
          duration: 3000,
          color: 'success'
        });
        toast.present();
        window.localStorage.setItem('phoneData', JSON.stringify(body));
        window.localStorage.setItem('validUser', '1');
        this.navCtrl.navigateRoot('/home/dashboard');
      }).catch(async (err) => {
        console.error(err);
        const toast = await this.toastCtrl.create({
          message: err.message,
          duration: 2000,
          color: 'danger'
        });
        toast.present();
        loading.dismiss();
      });
    }
  }

  regFB() {
    if (this.platform.is('capacitor') || this.platform.is('cordova')) {
      this.fb.login([
        'public_profile',
        'email'
      ]).then((res: FacebookLoginResponse) => {
        console.log('Logged into Facebook!', res);
        console.dir(res);
        this.fb.api(`/me?fields=id,name,email,picture`, []).then(async (ress) => {
          const params = {
            username: ress.name,
            name: ress.name,
            red_social: 'FB',
            id_usuario_red_social: ress.id,
            respuesta: JSON.stringify(res),
            email: ress.email  // notification_id: this.oneSignal.getPlayerId(),
          };
          const body = {
            email: ress.email,
            name: ress.name,
            lastname: '',
            red_social: 'FB',
            password: ress.id,
            imei: this.device.uuid,
            modelo: this.device.model,
            marca: this.device.manufacturer,
            plataforma: this.device.platform,
            version: this.device.version,
            tipo: 'APP_smart'
          };
          this.customersService.setPhone(body);
          const toast = await this.toastCtrl.create({
            message: 'Bienvenido',
            duration: 3000,
            color: 'success'
          });
          toast.present();
          window.localStorage.setItem('phoneData', JSON.stringify(body));
          window.localStorage.setItem('validUser', '1');
          this.navCtrl.navigateRoot('/home/dashboard');
          // this.fb.logout();
        }).catch((err) => {
          console.error(JSON.stringify(err));
        });
      }).catch((e) => {
        console.log('Error logging into Facebook', e);
      });
    }
  }

  regGmail(){
    if (this.platform.is('capacitor') || this.platform.is('cordova')) {
      this.googlePlus.login({
        webClientId: '356324128218-uikft863lvie0c64p1q2eb0u0lutbmbu.apps.googleusercontent.com',
        offline: true
      })
        .then(async (result) => {
          console.log(result);
          const body = {
            email: result.email,
            name: result.displayName,
            lastname: '',
            red_social: 'Google',
            password: result.userId,
            imei: this.device.uuid,
            modelo: this.device.model,
            marca: this.device.manufacturer,
            plataforma: this.device.platform,
            version: this.device.version,
            tipo: 'APP_smart'
          };
          this.customersService.setPhone(body);
          const toast = await this.toastCtrl.create({
            message: 'Bienvenido',
            duration: 3000,
            color: 'success'
          });
          toast.present();
          window.localStorage.setItem('phoneData', JSON.stringify(body));
          window.localStorage.setItem('validUser', '1');
          this.navCtrl.navigateRoot('/home/dashboard');
        })
        .catch((err) => {
          alert(JSON.stringify(err));
          console.error(err);
        });
    } else {
      // this.authService.singGoogle()
    }
  }
  gotoLogin() {
    this.navCtrl.navigateForward('/login');
  }

  async eneLoadingPic() {
    this.loadingPic = await this.loadingCtrl.create({
      message: 'Espere',
      duration: 2000
    });
    await this.loadingPic.present();
  }

  async goToContac() {
    console.log('goToContac');

  }

  async onShowOptions(ev: MouseEvent) {

  }



}

