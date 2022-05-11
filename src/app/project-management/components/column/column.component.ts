import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PMDataService } from '../../services/PMData/pmdata.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})

export class ColumnComponent {
  constructor(
    private pmDataService: PMDataService,
    public translate: TranslateService
    ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
  }

  deleteColumnOnCkick() {
    //this.pmDataService.openConfirmationModal();
  }

}
