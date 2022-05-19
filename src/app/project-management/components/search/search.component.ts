import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {

  constructor(
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
  }

}
