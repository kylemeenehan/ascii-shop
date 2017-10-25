import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDatePipe } from './product-date/product-date.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProductDatePipe],
  exports: [ ProductDatePipe ]
})
export class PipesModule { }
