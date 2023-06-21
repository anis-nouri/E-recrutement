import { TestBed } from '@angular/core/testing';

import { ResultsserviceService } from './resultsservice.service';

describe('ResultsserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResultsserviceService = TestBed.get(ResultsserviceService);
    expect(service).toBeTruthy();
  });
});
