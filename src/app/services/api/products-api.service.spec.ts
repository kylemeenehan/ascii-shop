import { TestBed, inject } from '@angular/core/testing';

import { ProductsApiService } from './products-api.service';

describe('ProductsApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsApiService]
    });
  });

  it('should be created', inject([ProductsApiService], (service: ProductsApiService) => {
    expect(service).toBeTruthy();
  }));
});
