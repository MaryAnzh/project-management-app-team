import { TestBed } from '@angular/core/testing';

import { PMDataService } from './pmdata.service';

describe('PMDataService', () => {
  let service: PMDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PMDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
