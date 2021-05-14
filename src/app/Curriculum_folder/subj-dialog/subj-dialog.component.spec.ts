import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjDialogComponent } from './subj-dialog.component';

describe('SubjDialogComponent', () => {
  let component: SubjDialogComponent;
  let fixture: ComponentFixture<SubjDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
