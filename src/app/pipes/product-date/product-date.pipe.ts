import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productDate'
})
export class ProductDatePipe implements PipeTransform {

  transform(date : string): string {

    let now = new Date();
    let productDate = new Date(date);

    let dayDifference = Math.round((now.getTime() - productDate.getTime()) / 1000 / 60 / 60 / 24);
    
    if ( dayDifference <= 7 ) {
      if ( dayDifference == 0 ) {
        return 'Today!';
      } else if ( dayDifference == 1 ) {
        return dayDifference + ' day ago';
      } else {
        return dayDifference + ' days ago' 
      }
    } else {
      return productDate.toDateString();
    }
  }

}
