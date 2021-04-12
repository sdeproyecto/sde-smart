import { NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  api = 'environment.api';

  constructor(
    public http: HttpClient,
    public util: UtilService,
    public navCtrl: NavController) {

  }

  // GRL GET PARAMS
  _getDefault(url) {
    return this.http.get(url, { observe: 'response' });
  }

}
