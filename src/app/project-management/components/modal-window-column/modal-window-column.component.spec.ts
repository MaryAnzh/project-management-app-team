import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWindowColumnComponent } from './modal-window-column.component';

describe('ModalWindowColumnComponent', () => {
  let component: ModalWindowColumnComponent;
  let fixture: ComponentFixture<ModalWindowColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalWindowColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWindowColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
