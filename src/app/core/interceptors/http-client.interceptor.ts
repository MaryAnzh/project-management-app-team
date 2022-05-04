import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage.service';
import { IResAuthLogin } from '../models/models';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {

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
        }
    })
  }
}
