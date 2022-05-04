import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pop-up-auth-error',
  templateUrl: './pop-up-auth-error.component.html',
  styleUrls: ['./pop-up-auth-error.component.scss']
})

export class PopUpAuthErrorComponent {
  @Input() public visible: boolean = true;
  @Output() public visibleChange = new EventEmitter<boolean>()

  closeOnClick() {
    this.visible = false;
    this.visibleChange.emit(this.visible);

  }

}
