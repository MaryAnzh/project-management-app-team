import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private pmDataService: PMDataService) {

  }

  deleteColumnOnCkick() {
    //this.pmDataService.openConfirmationModal();
  }

}
