import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductListingPageComponent } from './product-listing-page/product-listing-page.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProductCardComponent, ProductListingPageComponent]
})
export class ComponentsModule { }
