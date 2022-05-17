import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWindowBoardComponent } from './modal-window-board.component';

describe('ModalWindowBoardComponent', () => {
  let component: ModalWindowBoardComponent;
  let fixture: ComponentFixture<ModalWindowBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalWindowBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWindowBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
