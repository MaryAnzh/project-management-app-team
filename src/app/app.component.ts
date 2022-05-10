import { Component, HostListener } from '@angular/core';
import { Observable, SubscriptionLike } from 'rxjs';
import { AuthService } from './auth/services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public isScroll: boolean = false;
  public isScrollUp: boolean = false;

  public isAuth: boolean = false;
  public isAuth$: SubscriptionLike;

  public title: string = 'project-management-app';

  constructor(private authService: AuthService, public translate: TranslateService) {
    this.isAuth$ = this.authService.isLoggedIn$.subscribe(
      (value: boolean) => {
        this.isAuth = value
      }
    )
  }

  @HostListener("window:scroll", []) onWindowScroll() {

    const pageYOffset = window.pageYOffset;
    if (this.isAuth) {
      if (pageYOffset > 99) {
        this.isScroll = true;
      }
      if (pageYOffset === 0) {
        this.isScroll = false;
      }
    }

  }

}
