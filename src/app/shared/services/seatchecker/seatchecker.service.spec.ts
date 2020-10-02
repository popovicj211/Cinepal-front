import { TestBed } from '@angular/core/testing';

import { SeatcheckerService } from './seatchecker.service';

describe('SeatcheckerService', () => {
  let service: SeatcheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatcheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
