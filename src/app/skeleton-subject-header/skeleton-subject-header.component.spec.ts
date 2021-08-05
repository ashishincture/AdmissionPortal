import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonSubjectHeaderComponent } from './skeleton-subject-header.component';

describe('SkeletonSubjectHeaderComponent', () => {
  let component: SkeletonSubjectHeaderComponent;
  let fixture: ComponentFixture<SkeletonSubjectHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonSubjectHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonSubjectHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
