import { CustomersService } from './customers.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    CustomersService
  ],
  declarations: []
})
export class ServiceModule { }
