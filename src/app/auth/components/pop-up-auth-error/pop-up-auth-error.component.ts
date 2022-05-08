import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { IErrorMessage } from '../../../core/models/respons-error.model';
import { Observable, SubjectLike, Subscribable, SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-pop-up-auth-error',
  templateUrl: './pop-up-auth-error.component.html',
  styleUrls: ['./pop-up-auth-error.component.scss']
})

export class PopUpAuthErrorComponent {
  @Input() public visible: boolean = false;
  @Input() public errorMessage: string = '';
  @Output() public visibleChange = new EventEmitter<boolean>();

  constructor(private authService: AuthService) {

  }

  closeOnClick() {
    this.visible = false;
    this.visibleChange.emit(this.visible);

  }

}
