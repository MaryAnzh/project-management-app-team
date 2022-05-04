import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { HttpClientInterceptor } from './http-client.interceptor';

export const httpInterceptorsProviders: Provider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpClientInterceptor,
    multi: true,
  },
];
