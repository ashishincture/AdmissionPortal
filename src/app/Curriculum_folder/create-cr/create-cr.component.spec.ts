import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCrComponent } from './create-cr.component';

describe('CreateCrComponent', () => {
  let component: CreateCrComponent;
  let fixture: ComponentFixture<CreateCrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
