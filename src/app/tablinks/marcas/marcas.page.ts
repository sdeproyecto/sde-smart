import { CustomersClientService } from './../../services/fs-client/customers-client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.page.html',
  styleUrls: ['./marcas.page.scss'],
})
export class MarcasPage implements OnInit {

  constructor(public customerService: CustomersClientService) { }

  ngOnInit() {
  }

  logout() {
    this.customerService.logOut().then(() => {
      window.localStorage.removeItem('validUser');
    });
  }

}
