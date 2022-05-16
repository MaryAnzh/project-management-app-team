import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { httpInterceptorsProviders } from './core/interceptors/interceptors';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ProjectManagementModule } from './project-management/project-management.module';
import { InformationModule } from './information/information.module';
import { Observable, SubscriptionLike } from 'rxjs';
import { AuthService } from './auth/services/auth/auth.service';

// export function httpTranslateLoaderFactory(http: HttpClient): TranslateHttpLoader {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }

export function httpTranslateLoaderFactory(httpBackend: HttpBackend): TranslateHttpLoader {
  return new TranslateHttpLoader(new HttpClient(httpBackend));
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: httpTranslateLoaderFactory,
    //     deps: [HttpClient]
    //   }
    // }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          deps: [HttpBackend],
          useFactory: httpTranslateLoaderFactory
      }
  }),
    CoreModule,
    ProjectManagementModule,
    InformationModule
  ],
  providers: [httpInterceptorsProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
  public isAuth$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isAuth$ = this.authService.isLoggedIn$;
  }
 }
