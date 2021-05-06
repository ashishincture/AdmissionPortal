import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Crcomp1Component } from './crcomp1.component';

describe('Crcomp1Component', () => {
  let component: Crcomp1Component;
  let fixture: ComponentFixture<Crcomp1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Crcomp1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Crcomp1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
