import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNotApproveComponent } from './dialog-not-approve.component';

describe('DialogNotApproveComponent', () => {
  let component: DialogNotApproveComponent;
  let fixture: ComponentFixture<DialogNotApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNotApproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNotApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
