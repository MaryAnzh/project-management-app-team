import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {

  constructor( public translate: TranslateService ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
  }

}
