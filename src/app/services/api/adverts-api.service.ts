import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AdvertsApiService {

  constructor(private http: HttpClient) { }

  getAdvert(query: number){


    // A promise is used here to demonstrate the use of vanilla js... you don't always need a library!

    const adPromise = new Promise((resolve, reject) => {

      // The api returns an image, not a url. The response type is set to arraybuffer so that the raw file can be handled
      return this.http.get(`http://localhost:8000/ad?r=${query}`, {responseType: 'arraybuffer'}).subscribe((data) => {
        
        // The code below is adapted from this gist: https://gist.github.com/candycode/f18ae1767b2b0aba568e
        let view = new Uint8Array( data );
        let blob = new Blob( [ view ], { type: "image/jpeg" } );
        let urlCreator = window.URL || window['webkitURL'];
        let url = urlCreator.createObjectURL( blob );
        resolve(url);
      })  
    })

    return adPromise;
    
  }

}
