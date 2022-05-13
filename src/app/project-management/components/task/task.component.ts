import { Component } from '@angular/core';
import { crossSvg } from '../../../shared/svg/icon';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})

export class TaskComponent {
  public crossSVG: string = crossSvg;

  constructor() { }

}
