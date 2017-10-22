import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/Rx';

@Injectable()
export class ProductsApiService {

  constructor(private http: HttpClient) { }

  getProducts(numberOfProducts: number, skip: number = 0) {
    const productsObservable = Observable.create((observer: Observer<any>) => {
      this.http.get(`http://localhost:8000/api/products?limit=${numberOfProducts}&skip=${skip}`, { responseType: 'text' }).subscribe((data) => {
        let productStringArray = data.split('\n');
        // remove empty element from the end of the array
        productStringArray.pop();
        let products = [];
        let end = false;
        if (productStringArray.length > 0) {
          products = productStringArray.map((line) => {
            return JSON.parse(line);
          });
          if (productStringArray.length < numberOfProducts) {
            end = true
          }
        } 

        observer.next({products, end});
      });
    })

    return productsObservable;

  }

}
