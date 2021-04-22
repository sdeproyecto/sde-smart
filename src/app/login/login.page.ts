import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {
  NavController, ModalController, AlertController, LoadingController,
  MenuController, Platform, PopoverController, ToastController
} from '@ionic/angular';
import { EventsService } from '../services/events.service';
import { UtilService } from '../services/util.service';
import { CustomersClientService } from '../services/fs-client/customers-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public events: EventsService,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public authService: CustomersClientService,
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
      this.authService.signup(this.email, this.password).then((res) => {
        console.log(res);
        const aux = {
          email: this.email,
          password: this.password
        };
        this.isValid = true;
        const aux2 = JSON.parse(window.localStorage.getItem('phoneData'));
        this.authService.setPhone(aux2);
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

  login() {
    // this.navCtrl.setRoot(HomePage);// quitar
    // alert('this.token_id ' + this.token_id);
    const band = true;
    this.eneLoadingPic();
    this.authService.signin(this.todo.value.username + '@gmail.com', this.todo.value.password).then((res) => {
      console.log(res);
      this.authService.searchUser(this.todo.value.username).then(async (val) => {
        console.log(' val', val);
        this.loadingPic.dismiss();
        if (val && val.length > 0) {
          const aux = val[0];
          console.log(JSON.stringify(aux));
          if (aux.tipo_usuario && aux.tipo_usuario.cod_tipo_usuario !== 'TIPO-APP') {
            const toast = await this.toastCtrl.create({
              message: 'Usuario no permitido',
              duration: 4000,
              color: 'danger'
            });
            toast.present();
          }else {
            const toast = await this.toastCtrl.create({
              message: 'Bienvenido',
              duration: 2000,
              color: 'success'
            });
            toast.present();
          }
          this.isValid = true;
          window.localStorage.setItem('validUser', '1');
          this.navCtrl.navigateRoot('/home');
        } else {
          const toast = await this.toastCtrl.create({
            message: 'Usuario no permitido',
            duration: 4000,
            color: 'danger'
          });
          toast.present();
        }
      });
    }).catch(async (err) => {
      this.loadingPic.dismiss();
      const toast = await this.toastCtrl.create({
        message: 'Error',
        duration: 4000,
        color: 'danger'
      });
      toast.present();
    });


    console.log('0 LoginPage');
  }

  gotoRegister() {
    this.navCtrl.navigateForward('/landing');
  }

  async eneLoadingPic() {
    this.loadingPic = await this.loadingCtrl.create({
      message: 'Espere',
      // duration: 2000
    });
    await this.loadingPic.present();
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
