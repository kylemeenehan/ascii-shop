import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductsApiService {

  constructor( private http: HttpClient ) { }

  getProducts(){
    this.http.get('http://localhost:8000/api/products', { responseType: 'text' }).subscribe((data) => {
      let productStringArray = data.split('\n');
      // remove empty element from the end of the array
      productStringArray.pop();
      
      let products = productStringArray.map((line) => {
        return JSON.parse(line);
      });
      console.log(products);
    });
  }

}
