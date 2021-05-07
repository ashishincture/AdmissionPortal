import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulationDetailsComponent } from './regulation-details.component';

describe('RegulationDetailsComponent', () => {
  let component: RegulationDetailsComponent;
  let fixture: ComponentFixture<RegulationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegulationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegulationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
