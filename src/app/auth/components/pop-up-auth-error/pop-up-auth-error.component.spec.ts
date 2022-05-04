import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpAuthErrorComponent } from './pop-up-auth-error.component';

describe('PopUpAuthErrorComponent', () => {
  let component: PopUpAuthErrorComponent;
  let fixture: ComponentFixture<PopUpAuthErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpAuthErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpAuthErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
