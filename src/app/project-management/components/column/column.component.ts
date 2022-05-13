import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PMDataService } from '../../services/PMData/pmdata.service';
import { crossSvg } from 'src/app/shared/svg/icon';
import { IColumnsData } from 'src/app/core/models/request.model';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})

export class ColumnComponent {

  @Input() public column: IColumnsData | undefined;

  constructor(
    private pmDataService: PMDataService,
    public translate: TranslateService
    ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
  }

  deleteColumnOnCkick() {
    if (this.column) {
      this.pmDataService.deleteColumn(this.column.id);
    }
  }

}
