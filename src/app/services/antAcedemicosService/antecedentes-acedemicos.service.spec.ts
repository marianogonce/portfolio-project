import { TestBed } from '@angular/core/testing';

import { AntecedentesAcedemicosService } from './antecedentes-acedemicos.service';

describe('AntecedentesAcedemicosService', () => {
  let service: AntecedentesAcedemicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AntecedentesAcedemicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
