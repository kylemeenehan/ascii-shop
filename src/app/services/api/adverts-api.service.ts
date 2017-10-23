import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/Rx';

@Injectable()
export class AdvertsApiService {

  constructor(private http: HttpClient) { }

  getAdvert(query: number){

    const adPromise = new Promise((resolve, reject) => {
      return this.http.get(`http://localhost:8000/ad?r=${query}`, {responseType: 'arraybuffer'}).subscribe((data) => {
        let arrayBufferView = new Uint8Array( data );
        let blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
        let urlCreator = window.URL || window['webkitURL'];
        let url = urlCreator.createObjectURL( blob );
        resolve(url);
      })  
    })

    return adPromise;
    
  }

}
