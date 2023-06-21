import { TestBed } from '@angular/core/testing';

import { OfferserviceService } from './offerservice.service';

describe('OfferserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfferserviceService = TestBed.get(OfferserviceService);
    expect(service).toBeTruthy();
  });
});
