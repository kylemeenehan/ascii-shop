import { Component, OnInit } from '@angular/core';

import { ProductsApiService } from '../../services/api/products-api.service';

@Component({
  selector: 'app-product-listing-page',
  templateUrl: './product-listing-page.component.html',
  styleUrls: ['./product-listing-page.component.scss']
})
export class ProductListingPageComponent implements OnInit {

  productsSubscription;
  products;

  constructor( private productsApi: ProductsApiService ) { }

  ngOnInit() {
    this.productsSubscription = this.productsApi.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

}
