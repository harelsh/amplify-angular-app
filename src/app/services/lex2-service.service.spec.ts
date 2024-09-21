import { TestBed } from '@angular/core/testing';

import { Lex2ServiceService } from './lex2-service.service';

describe('Lex2ServiceService', () => {
  let service: Lex2ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Lex2ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
