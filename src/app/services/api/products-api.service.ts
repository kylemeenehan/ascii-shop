import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/Rx';

import Product from '../../../types/product';

@Injectable()
export class ProductsApiService {

  constructor(private http: HttpClient) { }

  getProducts(numberOfProducts: number, skip: number = 0, sortQuery: string = 'id') {
    const productsObservable = Observable.create((observer: Observer<any>) => {
      this.http.get(`http://localhost:8000/api/products?limit=${numberOfProducts}&skip=${skip}&sort=${sortQuery}`, { responseType: 'text' }).subscribe((data) => {
        let productStringArray = data.split('\n');
        // remove empty element from the end of the array
        productStringArray.pop();
        let products: Product[] = [];
        if (productStringArray.length > 0) {
          products = productStringArray.map((line) => {
            return JSON.parse(line);
          });
        } 

        observer.next(products);
      });
    })

    return productsObservable;

  }

}
