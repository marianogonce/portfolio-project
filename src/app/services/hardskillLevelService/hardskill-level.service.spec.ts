import { TestBed } from '@angular/core/testing';

import { HardskillLevelService } from './hardskill-level.service';

describe('HardskillLevelService', () => {
  let service: HardskillLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardskillLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
