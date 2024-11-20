import { TestBed } from '@angular/core/testing';

import { KisilerService } from './kisiler.service';

describe('KisilerService', () => {
  let service: KisilerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KisilerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
