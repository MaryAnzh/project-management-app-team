import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators, FormControlDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { PMDataService } from '../../services/PMData/pmdata.service';

@Component({
  selector: 'app-modal-window-board',
  templateUrl: './modal-window-board.component.html',
  styleUrls: ['./modal-window-board.component.scss']
})

export class ModalWindowBoardComponent {
  public newBoardForm: FormGroup;

  constructor(
    private pmDataService: PMDataService,
    public translate: TranslateService,
  ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');

    this.newBoardForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(151),
      ]),
    });
  }

  get title(): AbstractControl {
    return <AbstractControl>this.newBoardForm.get('title');
  }

  get description(): AbstractControl {
    return <AbstractControl>this.newBoardForm.get('description');
  }

  sunmit(): void {
    this.pmDataService.createBoard(this.newBoardForm.value.title, this.newBoardForm.value.description);
  }

}
