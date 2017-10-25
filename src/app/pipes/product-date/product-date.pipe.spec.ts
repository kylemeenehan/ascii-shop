import { ProductDatePipe } from './product-date.pipe';

describe('ProductDatePipe', () => {
  const pipe = new ProductDatePipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return a string', () => {
    let dateString = pipe.transform('2017-01-21');
    expect(typeof(dateString) == 'string');
  });

  let msInDay = 1000 * 60 * 60 * 24;
  let today = new Date();
  let yesterday = new Date(today.getTime() - msInDay);
  let dayBefore = new Date(yesterday.getTime() - msInDay)

  it('should return "Today!" for a date set today', () => {
    let dateString = pipe.transform(today.toDateString());
    expect(dateString == 'Today!').toBeTruthy();
  });

  it('should return "1 day ago" for a date set yesterday', () => {
    let dateString = pipe.transform(yesterday.toDateString());
    expect(dateString == '1 day ago').toBeTruthy();
  })

  it('should return "2 days ago" for a date set 2 days ago', () => {
    let dateString = pipe.transform(dayBefore.toDateString());
    expect(dateString == '2 days ago').toBeTruthy();
  })

});
