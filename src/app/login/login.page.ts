import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {
  NavController, ModalController, AlertController, LoadingController,
  MenuController, Platform, PopoverController, ToastController
} from '@ionic/angular';
import { EventsService } from '../services/events.service';
import { Device } from '@ionic-native/device/ngx';
import { UtilService } from '../services/util.service';
import { CustomersService } from '../services/fs/customers.service';
import { AuthService } from '../services/auth.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [AuthService],
})
export class LoginPage implements OnInit {
  todo: FormGroup;
  user: any;
  // tslint:disable-next-line:variable-name
  token_id: any;
  loader: any;
  loadingPic: HTMLIonLoadingElement;
  hasPermission: boolean;
  email: any;
  password: any;
  isValid: boolean;
  img: any;
  auxEmail: any;
  constructor(
    public device: Device,
    public googlePlus: GooglePlus,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public events: EventsService,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public fbservice: CustomersService,
    public authService: AuthService,
    public alertCtrl: AlertController,
    public menu: MenuController,
    public fb: Facebook,
    public util: UtilService) {
    this.menu.close();
    this.menu.swipeGesture(false);

    this.todo = this.formBuilder.group({
      cod_cliente: [''],
      clave: ['', Validators.required],
      email: ['', Validators.required],
    });

    const aux = JSON.parse(window.localStorage.getItem('loginUser'));
    const aux2 = JSON.parse(window.localStorage.getItem('saveUser'));
    console.log(aux);
    if (aux && aux.email && aux.password && !aux2) {
      this.email = aux.email;
      this.password = aux.password;
      // this.signupApp();
    }
  }

  ngOnInit() {
    console.log('ngOnInit LoginPage');
  }

  /*
    signupApp() {
      this.fbservice.signup(this.email, this.password).then((res) => {
        console.log(res);
        const aux = {
          email: this.email,
          password: this.password
        };
        this.isValid = true;
        const aux2 = JSON.parse(window.localStorage.getItem('phoneData'));
        this.fbservice.setPhone(aux2);
      }).catch(async (err) => {
        const toast = await this.toastCtrl.create({
          message: 'Error',
          duration: 4000,
          color: 'danger'
        });
        if (err.code === 'auth/email-already-in-use') {
          this.isValid = true;
        } else {
          console.error(err);
          toast.present();
        }
      });

    }
  */

  getUser() {
    this.fbservice.searchUser(this.todo.value.username).then((val) => {
      console.log(' val val', val);
      console.log(JSON.stringify(val));
      if (val && val.length > 0) {
        const aux = val[0];
        console.log(JSON.stringify(aux));
        if (aux.tipo_usuario && aux.tipo_usuario.cod_tipo_usuario !== 'TIPO-APP') {
          this.showToast('danger', 'Usuario no permitido');
        } else {
          this.showToast('success', 'Bienvenido');
        }
        this.isValid = true;
        window.localStorage.setItem('validUser', '1');
        this.navCtrl.navigateRoot('/home/marcas');
      } else {
        /*for (const iterator of this.fbservice.) {
          if (iterator.email === this.todo.value.username) {
            this.showToast('success', 'Bienvenido');
            console.log('help 2');
            this.isValid = true;
            window.localStorage.setItem('validUser', '1');
            this.navCtrl.navigateRoot('/home/marcas');
            return;
          }
        }*/
        this.showToast('danger', 'Usuario no encontrado');
      }
    });
  }

  gotoRegister() {
    this.navCtrl.navigateForward('/landing');
  }

  async loginNormal() {
    if (this.todo.valid) {
      const loading = await this.loadingCtrl.create({
        message: 'Espere...',
        duration: 4000
      });
      await loading.present();
      const body = {
        email: this.todo.value.email,
        password: this.todo.value.clave
      };
      this.authService.login(body.email, body.password).then((dat) => {
        console.log(dat);
        this.goEnter(loading);
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


  loginGoogle() {
    if (this.platform.is('capacitor') || this.platform.is('cordova')) {
      this.googlePlus.login({
        webClientId: '356324128218-uikft863lvie0c64p1q2eb0u0lutbmbu.apps.googleusercontent.com',
        offline: true
      })
        .then((result) => {
          console.log(result);
          this.goEnter();
        })
        .catch((err) => {
          alert(JSON.stringify(err));
          console.error(err);
        });
    } else {
      this.authService.singGoogle();
    }
  }

  async goEnter(loading?) {
    let loading1 = await this.loadingCtrl.create({
      message: 'Espere...'
    });
    if (loading) {
      loading1 = loading;
    }
    loading1.present();

    this.fbservice.searchPhone(this.device.uuid).then((dat2) => {
      console.log(dat2);
      for (const iterator of dat2) {
        if (iterator.email === this.todo.value.email) {
          this.auxEmail = true;
          this.todo.reset();
          window.localStorage.setItem('phoneData', JSON.stringify(iterator));
          window.localStorage.setItem('validUser', '1');
          localStorage.setItem('userData', JSON.stringify(iterator));
          this.util.setUser(iterator);
          this.navCtrl.navigateRoot('/home/dashboard');
        }
      }
      loading1.dismiss();
    });
  }

  loginFb() {
    if (this.platform.is('capacitor') || this.platform.is('cordova')) {
      this.fb.login([
        'public_profile',
        'email'
      ]).then((res: FacebookLoginResponse) => {
        console.log('Logged into Facebook!', res);
        console.dir(res);
        this.fb.api(`/me?fields=id,name,email,picture`, []).then((ress) => {
          const params = {
            username: ress.name,
            name: ress.name,
            red_social: 'FB',
            id_usuario_red_social: ress.id,
            respuesta: JSON.stringify(res),
            email: ress.email  // notification_id: this.oneSignal.getPlayerId(),
          };
          this.goEnter();
          // this.fb.logout();
        }).catch((err) => {
          console.error(JSON.stringify(err));
        });
      }).catch((e) => {
        console.log('Error logging into Facebook', e);
      });
    }
  }


  async eneLoadingPic() {
    this.loadingPic = await this.loadingCtrl.create({
      message: 'Espere',
      // duration: 2000
    });
    await this.loadingPic.present();
  }

  async showToast(cod, msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 4000,
      color: cod
    });
    toast.present();
  }


  async forgot() {
    const alert = await this.alertCtrl.create({
      header: 'Ingresa tu usuario & email, para recuperar tu clave',
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        },
        {
          name: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ok',
          handler: data => {
            if (data.username && data.email) {
              const val = {
                cuenta: data.username,
                email: data.email
              };
              // TODO
            }
            else {
              // invalid login
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
  }

}
