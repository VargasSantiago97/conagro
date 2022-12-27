import { TestBed } from '@angular/core/testing';

import { ComunicacionConagroService } from './comunicacion-conagro.service';

describe('ComunicacionConagroService', () => {
  let service: ComunicacionConagroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunicacionConagroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
