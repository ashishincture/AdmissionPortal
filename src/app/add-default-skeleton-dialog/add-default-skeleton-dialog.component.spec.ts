import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDefaultSkeletonDialogComponent } from './add-default-skeleton-dialog.component';

describe('AddDefaultSkeletonDialogComponent', () => {
  let component: AddDefaultSkeletonDialogComponent;
  let fixture: ComponentFixture<AddDefaultSkeletonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDefaultSkeletonDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDefaultSkeletonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
