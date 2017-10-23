import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

import { ProductsApiService } from '../../services/api/products-api.service';
import { AdvertsApiService } from '../../services/api/adverts-api.service';

import Product from '../../../types/product';

@Component({
  selector: 'app-product-listing-page',
  templateUrl: './product-listing-page.component.html',
  styleUrls: ['./product-listing-page.component.scss']
})
export class ProductListingPageComponent implements OnInit, OnDestroy {

  @ViewChild('infiniteScrollContainer') infiteScrollContainer: ElementRef;
  productsSubscriptions: Subscription[] = [];
  productCache: Product[] = [];
  products: Product[];
  productSubject: Subject<Product[]> = new Subject();
  productUpdateObservable;
  productCount: number = 0;
  productLoadInterval: number = 20;
  loadingMore: boolean = false;
  initialLoad: boolean = true;
  noMoreProducts: boolean = false;
  sortQuery: string = 'id';
  advertUrls: string[] = [];

  constructor(private productsApi: ProductsApiService, private advertsApi: AdvertsApiService, private sanitizer: DomSanitizer) {
    
  }

  ngOnInit() {

   this.productSubject.subscribe((products: Product[]) => {
     this.products = products;
   }) 

   this.loadMoreProducts(); 

    window.addEventListener('scroll', (event) => {
      if (window.scrollY >= this.infiteScrollContainer.nativeElement.offsetHeight - window.innerHeight) {
        this.loadMoreProducts();
      }
    })
  }

  loadMoreProducts() {
    if (!(this.loadingMore || this.noMoreProducts)) {
      this.loadingMore = true;
      
      this.productsSubscriptions.push(this.productsApi.getProducts(this.productLoadInterval, this.productCount, this.sortQuery).subscribe((data) => {
        data.products.map((product) => {
          this.productCache.push(product);
        });
        this.productSubject.next(this.productCache);
        this.loadingMore = false;
        this.noMoreProducts = data.end;
      }));

      this.productCount += this.productLoadInterval;
    }

  }

  sortBy(query: string) {
    this.sortQuery = query;
    this.reset();
    this.loadMoreProducts();
    
  }

  reset(){
    this.productCache = [];
    this.products = [];
    this.productCount = 0;
  }

  getAdvert(index: number = 1){
    if (this.advertUrls[index]){
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.advertUrls[index]);
    } else {
      this.advertsApi.getAdvert(index).then((url: string) => {
        this.advertUrls[index] = url;
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.advertUrls[index]);
      })
    }
    
  }

  ngOnDestroy(){
    this.productsSubscriptions.map((subscription) => {
      subscription.unsubscribe();
    })
  }

}
