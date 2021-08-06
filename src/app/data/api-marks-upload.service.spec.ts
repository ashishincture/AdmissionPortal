import { TestBed } from '@angular/core/testing';

import { ApiMarksUploadService } from './api-marks-upload.service';

describe('ApiMarksUploadService', () => {
  let service: ApiMarksUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMarksUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
