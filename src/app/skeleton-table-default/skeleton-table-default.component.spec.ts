import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonTableDefaultComponent } from './skeleton-table-default.component';

describe('SkeletonTableDefaultComponent', () => {
  let component: SkeletonTableDefaultComponent;
  let fixture: ComponentFixture<SkeletonTableDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonTableDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonTableDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
