import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

import { ProductsApiService } from '../../services/api/products-api.service';

@Component({
  selector: 'app-product-listing-page',
  templateUrl: './product-listing-page.component.html',
  styleUrls: ['./product-listing-page.component.scss']
})
export class ProductListingPageComponent implements OnInit {

  @ViewChild('infiniteScrollContainer') infiteScrollContainer: ElementRef;
  productsSubscriptions: Subscription[] = [];
  productCache: any[] = [];
  products: any[];
  productSubject: Subject<any[]> = new Subject();
  productCount: number = 20;
  productLoadInterval: number = 20;
  loadingMore: boolean = false;

  constructor(private productsApi: ProductsApiService) {
    
  }

  ngOnInit() {

    Observable.create((observer: Observer<any>) => {
      this.productSubject.subscribe((products) => {
        this.products = products;
      })
    });

    this.productsSubscriptions.push(this.productsApi.getProducts(this.productCount).subscribe((products) => {
      this.productCache.push(products);
      this.products = products;
    }));

    window.addEventListener('scroll', (event) => {
      if (window.scrollY >= this.infiteScrollContainer.nativeElement.offsetHeight - window.innerHeight) {
        console.log('load more');
        this.loadMoreProducts();
      }
    })
  }

  loadMoreProducts() {
    if (!this.loadingMore) {
      this.loadingMore = true;
      
      this.productsSubscriptions.push(this.productsApi.getProducts(this.productCount).subscribe((products) => {
        this.productCache.push(products);
        this.productSubject.next(this.productCache);
        this.loadingMore = false;
      }));

      this.productCount += this.productLoadInterval;
    }
  }

}
