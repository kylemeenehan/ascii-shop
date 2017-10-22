import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/Rx';

@Injectable()
export class AdvertsApiService {

  constructor(private http: HttpClient) { }

  getAdvert(){
    this.http.get('http://localhost:8000/ad?r=1').subscribe((result) => {
      console.log(result);
    })
  }

}
