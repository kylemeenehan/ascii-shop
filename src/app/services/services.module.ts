import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsApiService } from './api/products-api.service';
import { InfiniteScrollService } from './infinite-scroll/infinite-scroll.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ProductsApiService,
    InfiniteScrollService
  ]
})
export class ServicesModule { }
