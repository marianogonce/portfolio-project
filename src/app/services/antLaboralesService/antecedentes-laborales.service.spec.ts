import { TestBed } from '@angular/core/testing';

import { AntecedentesLaboralesService } from './antecedentes-laborales.service';

describe('AntecedentesLaboralesService', () => {
  let service: AntecedentesLaboralesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AntecedentesLaboralesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
