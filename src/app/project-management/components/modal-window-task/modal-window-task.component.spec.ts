import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWindowTaskComponent } from './modal-window-task.component';

describe('ModalWindowTaskComponent', () => {
  let component: ModalWindowTaskComponent;
  let fixture: ComponentFixture<ModalWindowTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalWindowTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWindowTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
