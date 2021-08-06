import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGradingComponent } from './dialog-grading.component';

describe('DialogGradingComponent', () => {
  let component: DialogGradingComponent;
  let fixture: ComponentFixture<DialogGradingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGradingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogGradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
