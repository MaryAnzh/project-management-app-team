import { Component, OnInit } from '@angular/core';
import { PMDataService } from '../../services/PMData/pmdata.service';
import { crossSvg } from 'src/app/shared/svg/icon';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})

export class ColumnComponent {
  public crossSvg: string = crossSvg;

  constructor(private pmDataService: PMDataService) {

  }

  deleteColumnOnCkick() {
    //this.pmDataService.openConfirmationModal();
  }

}
