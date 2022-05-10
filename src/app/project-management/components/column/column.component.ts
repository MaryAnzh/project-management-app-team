import { Component, OnInit } from '@angular/core';
import { PMDataService } from '../../services/PMData/pmdata.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})

export class ColumnComponent {
  constructor(private pmDataService: PMDataService) {

  }

  deleteColumnOnCkick() {
    //this.pmDataService.openConfirmationModal();
  }

}
