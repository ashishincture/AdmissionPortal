import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonTableConfigureComponent } from './skeleton-table-configure.component';

describe('SkeletonTableConfigureComponent', () => {
  let component: SkeletonTableConfigureComponent;
  let fixture: ComponentFixture<SkeletonTableConfigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonTableConfigureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonTableConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
