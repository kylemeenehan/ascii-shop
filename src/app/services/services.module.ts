import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ProductsApiService } from './api/products-api.service';
import { AdvertsApiService } from './api/adverts-api.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ProductsApiService,
    AdvertsApiService
  ]
})
export class ServicesModule { }
