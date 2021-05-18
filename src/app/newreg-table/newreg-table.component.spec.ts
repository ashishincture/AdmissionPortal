import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewregTableComponent } from './newreg-table.component';

describe('NewregTableComponent', () => {
  let component: NewregTableComponent;
  let fixture: ComponentFixture<NewregTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewregTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewregTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
