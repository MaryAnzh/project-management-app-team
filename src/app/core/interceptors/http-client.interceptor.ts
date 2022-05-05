import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { IResAuthLogin } from '../models/request.model';
import { environment } from 'src/environments/environment';

@Injectable()

export class HttpClientInterceptor implements HttpInterceptor {

  private _baseURL = environment.configUrl;

  constructor(private storage: StorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAuthToken(request));
  }

  addAuthToken(request: HttpRequest<any>) {
    const user: IResAuthLogin | null = this.storage.getData('user') ? this.storage.getData('user') : null;
    const token = user ? user.token : '';

    return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
        url: `${this._baseURL}${request.url}`
    })
  }
}
