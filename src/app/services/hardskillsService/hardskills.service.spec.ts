import { TestBed } from '@angular/core/testing';

import { HardskillsService } from './hardskills.service';

describe('HardskillsService', () => {
  let service: HardskillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardskillsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
