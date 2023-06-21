import { TestBed } from '@angular/core/testing';

import { CandidatesServiceService } from './candidates-service.service';

describe('CandidatesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CandidatesServiceService = TestBed.get(CandidatesServiceService);
    expect(service).toBeTruthy();
  });
});
