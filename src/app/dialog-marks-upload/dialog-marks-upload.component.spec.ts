import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMarksUploadComponent } from './dialog-marks-upload.component';

describe('DialogMarksUploadComponent', () => {
  let component: DialogMarksUploadComponent;
  let fixture: ComponentFixture<DialogMarksUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMarksUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMarksUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
