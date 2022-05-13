import { TestBed } from '@angular/core/testing';

import { EstadoAcademicoService } from './estado-academico.service';

describe('EstadoAcademicoService', () => {
  let service: EstadoAcademicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoAcademicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
