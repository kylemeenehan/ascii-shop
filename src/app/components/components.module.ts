import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

import { ProductCardComponent } from './product-card/product-card.component';
import { ProductListingPageComponent } from './product-listing-page/product-listing-page.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [ProductCardComponent, ProductListingPageComponent, LoadingSpinnerComponent]
})
export class ComponentsModule { }
