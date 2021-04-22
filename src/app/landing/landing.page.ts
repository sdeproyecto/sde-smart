import { CustomersService } from './../services/fs/customers.service';
import { EventsService } from './../services/events.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavParams, NavController, PopoverController, LoadingController, ToastController, Platform, AlertController, MenuController } from '@ionic/angular';
import { UtilService } from '../services/util.service';
import { Device } from '@ionic-native/device/ngx';

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

  constructor(
    public navCtrl: NavController,
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
    public util: UtilService) {
    this.menu.close();
    this.menu.swipeGesture(false);
  }

  private iniForm() {
    this.todo = this.formBuilder.group({
      cod_cliente: ['', Validators.required],
      tel: ['', Validators.required],
      nombre: ['', Validators.required],
    });
  }

  ngOnInit() {
    console.log('ngOnInit LoginPage');
    const aux1 = JSON.parse(window.localStorage.getItem('validUser'));
    if (aux1) {
      this.navCtrl.navigateRoot('/home/marcas');
      return;
    } else {
      this.phoneData = {
        imei: this.device.uuid,
        modelo: this.device.model,
        marca: this.device.manufacturer,
        plataforma: this.device.platform,
        version: this.device.version
      };
      this.customersService.searchPhone(this.phoneData.imei).then(val => {
        console.log(' val', val);
        if (val && val.length > 0) {
          const aux = val[0];
          console.log(JSON.stringify(aux));
          if (aux.activo) {
            this.navCtrl.navigateRoot('/login');
          } else {
            this.navCtrl.navigateRoot('/waiting');
          }
        } else {
          this.phoneData.activo = false;
          this.iniForm();
        }
        this.load = true;
      });
    }
    // this.getAllcustomers();
  }

  getAllcustomers() {
    this.customersService.getAllCustomers().then(values => {
      // this.customers = values;
      console.log(' this.customers', values);
    });
  }

  getCode(text) {
    this.codValid = false;
    this.auxBd = null;
    this.customersService.searchCustomer(text).then(val => {
      console.log(' val', val);
      if (val && val.length > 0) {
        if (val[0].bd && val[0].bd.apiKey) {
          this.codValid = true;
          this.auxBd = val[0].bd;
          console.log(this.auxBd);
          this.phoneData.cod_cliente = val[0].cod_cliente;
        }
      }
      this.isSearching = false;
    });
  }

  checkCod() {
    clearTimeout(this.timeout);
    if (this.todo.value.cod_cliente) {
      this.isSearching = true;
    }
    this.timeout = setTimeout(() => {
      console.log('here>>> ' + this.todo.value.cod_cliente);
      if (this.todo.value.cod_cliente) {
        this.getCode(this.todo.value.cod_cliente);
      }
    }, 600);
  }

  async reg() {
    // this.navCtrl.setRoot(HomePage);// quitar
    // alert('this.token_id ' + this.token_id);
    const band = true;
    if (!this.codValid) {
      const toast = await this.toastCtrl.create({
        message: 'cod_cliente invalido',
        duration: 4000,
        color: 'danger'
      });
      toast.present();
      return;
    }
    this.eneLoadingPic();

    window.localStorage.setItem('fbKey', JSON.stringify(this.auxBd));
    /*const auxLogin = {
      email: this.todo.value.email,
      password: this.todo.value.password
    };
    window.localStorage.setItem('loginUser', JSON.stringify(auxLogin));*/
    this.phoneData.nombre = this.todo.value.nombre;
    this.phoneData.telefono = this.todo.value.tel;
    this.customersService.setPhone(this.phoneData);
    window.localStorage.setItem('phoneData', JSON.stringify(this.phoneData));
    setTimeout(() => {
      this.loadingPic.dismiss();
      this.navCtrl.navigateRoot('/waiting');
    }, 2000);
    console.log('0 LoginPage');
  }

  gotoLogin() {
    this.navCtrl.navigateForward('/login');
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

