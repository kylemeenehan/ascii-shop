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
  productCache: Product[] = [];
  products: Product[] = [];
  gettingNext: boolean = false;
  awaitingProducts: boolean = false;

  productsSubscriptions: Subscription[] = [];

  productCount: number = 0;
  productLoadInterval: number = 20;
  
  initialLoad: boolean = true;

  loadingMore: boolean = false;
  noMoreProducts: boolean = false;

  sortQuery: string = 'id';
  advertQueries: number[] = [];
  advertUrls: any[] = [];

  constructor(private productsApi: ProductsApiService, private advertsApi: AdvertsApiService, private sanitizer: DomSanitizer ) {
    
  }

  ngOnInit() {
    // Fetch initial advert
    this.getAdvert();
    
    // Initial Load of Products
    this.loadMoreProducts(); 
    
    // Add event listener for adding more products once user has reached the bottom of the page
    window.addEventListener('scroll', (event) => {
      if (window.scrollY >= this.infiteScrollContainer.nativeElement.offsetHeight - window.innerHeight) {
        this.loadMoreProducts();
      }
    })
  }

  loadMoreProducts() {
    // Check that there isn't already an instruction to load more products,
    // that there are still prducts to load,
    // or whether the program is awaiting more products
    if (!(this.loadingMore || this.noMoreProducts) || this.awaitingProducts) {
      
      this.loadingMore = true;

      // reset awaiting products so that the logic for awaiting products can execute further down
      this.awaitingProducts = false;

      if (this.initialLoad) {
        
        this.getInitialProducts();
        
      } else {

        // Fetch products from the product cache
        this.productCache.map((product) => {
          this.products.push(product);
        });

        // Trigger Angular Change Detection
        this.products = this.products.slice();

        // Check whether the end of the cache has been reached
        if (this.productCache.length == 0 || this.productCache.length < this.productLoadInterval) {

          // If the end of the product cache has been reached, check whether it's just in the process of
          // Fetching more products
          if (this.gettingNext) {

            // Signal to the get next products function that the load more function is awaitin products
            this.awaitingProducts = true;
          } else {

            // If the cache is empty and the get next function has no more products to return,
            // signal to the view that there are no more products
            this.noMoreProducts = true;
          }
        } else {
          // Clear cache
          this.productCache = [];
          
          // Reload cache
          this.getNextProducts();
          this.loadingMore = false;
        }

      }

      
    }

  }

  getInitialProducts(){

    // Store subscriptions in an array so that they can easily be unsubscribed from when the component is destroyed
    this.productsSubscriptions.push(this.productsApi.getProducts(this.productLoadInterval, this.productCount, this.sortQuery).subscribe((products) => {
      products.map((product) => {
        this.products.push(product);
      });

      // Trigger Angular Change Detection
      this.products = this.products.slice();
      
      // Change state to show that the product loading has completed
      this.loadingMore = false;
      
      this.initialLoad = false;
      
      // Update the product count to facilitate the correct offset in the api call
      this.productCount += this.productLoadInterval;

      this.getNextProducts();
    }));
  }
  
  getNextProducts() {

    this.gettingNext = true;

    // Add the subscription to an array to facilitate easy unsubscribing in the ngOnDestroy function
    this.productsSubscriptions.push(this.productsApi.getProducts(this.productLoadInterval, this.productCount, this.sortQuery).subscribe((products) => {

      // Push the produst fetched from the api to the product cache
      products.map((product) => {
        this.productCache.push(product);
      });

      this.gettingNext = false;
      
      // Update the product count to facilitate the correct offset in the api call
      this.productCount += this.productLoadInterval;

      // check to see whether the loadingMore function is waiting to receive products,
      // trigger the function if it is
      if (this.awaitingProducts) {
        this.loadMoreProducts();
      }
    }));

    // At the moment, each product load triggers an additional 20 products, if that number changes,
    // then the call to this function would need to be ammended so that there is still an advert for
    // every 20 product. At the moment though, we're keeping it lean.
    this.getAdvert();
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

  getAdvert(){

    // Instantiate a false boolean to keep track of whether a generated query is unique
    let uniqueQuery = false;

    let query;
    
    // Generate queries and check them against an array of existing queries to make sure that the
    // Query is unique
    while(!uniqueQuery) {

      // Generate a number from 1 to 100. This means that this code can only generate 100 unique adverts
      query = Math.floor( (Math.random() * 100 ) + 1);

      // Check whether a query is unique in the given set.
      // If the array is longer than 100, the function returns the first generated query to prevent
      // an infinite loop:
      if ( this.advertQueries.indexOf(query) == -1 || this.advertQueries.length >= 100) {
        this.advertQueries.push(query);
        uniqueQuery = true;
      }
    }
    
    // Fetch an advert with the unique query
    this.advertsApi.getAdvert(query).then((url: string) => {
      this.advertUrls.push(this.sanitizer.bypassSecurityTrustResourceUrl(url));
      this.advertUrls = this.advertUrls.slice();
    })
  }

  ngOnDestroy(){

    // Unsubscribe from product subscriptions on destroy
    this.productsSubscriptions.map((subscription) => {
      subscription.unsubscribe();
    })
  }

}
