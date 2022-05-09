import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewItemModalComponent } from './create-new-item-modal.component';

describe('CreateNewItemModalComponent', () => {
  let component: CreateNewItemModalComponent;
  let fixture: ComponentFixture<CreateNewItemModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewItemModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
