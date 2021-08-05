import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarksInsertionComponent } from './marks-insertion.component';

describe('MarksInsertionComponent', () => {
  let component: MarksInsertionComponent;
  let fixture: ComponentFixture<MarksInsertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarksInsertionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarksInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
