import { TestBed, inject } from '@angular/core/testing';

import { AdvertsApiService } from './adverts-api.service';

describe('AdvertsApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdvertsApiService]
    });
  });

  it('should be created', inject([AdvertsApiService], (service: AdvertsApiService) => {
    expect(service).toBeTruthy();
  }));
});
