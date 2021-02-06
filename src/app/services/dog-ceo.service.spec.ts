import { TestBed } from '@angular/core/testing';

import { DogCeoService } from './dog-ceo.service';

describe('DogCeoService', () => {
  let service: DogCeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DogCeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
