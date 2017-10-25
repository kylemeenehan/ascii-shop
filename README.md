# AsciiShop

# Features

### Products are displayed in a grid

For this I used Foundation's XY grid. I also created a service that calls the api.

Files:

* product-listing-page.component.ts
* product-listing-page.component.html
* products-api.service.ts
* _foundation.scss

### Give the user an option to sort the products in ascending order. Can sort by "size", "price" or "id"

For this I used a reset function that clears the products and starts the product page again with a new sort query.
This is in order to ensure that the sort covers the entire product range, rather than relying on frontend sorting only on the products that have already been loaded.

Files:

* product-listing-page.component.ts
* product-listing-page.component.html

### Each product has a size field, products are diplayed in the correct sizes

For this I used Angular interpolation for the string as well as the style

Files:

* product-listing-page.component.html

### Each product has a price field in cents, but displayed in dollars

For this I used Angular's currency pipe after dividing the cent value by 100

Files:

* product-listing-page.component.html

### Each product has a date field that should display the number of days ago that the product was created, or the date itself if the date is older than one week

For this I created a custom pipe. I also used this as an opportunity to write a unit test

Files:

* product-listing-page.component.html
* product-date.pipe.ts
* product-date.pipe.spec.ts

### the product grid should automatically load more items as you scroll down

The functionality for this can be found in the loadMoreProducts function in thie product listing page component:

Files:

* product-listing-page.component.ts

### our product database is under high load due to growing demand for ascii, so please display an animated "loading..." message while the user waits.

For this I created a component using a css spinner from (http://tobiasahlin.com/spinkit/)[http://tobiasahlin.com/spinkit/]

Files:

* loading-spinner.component.html
* loading-spinner.component.scss
