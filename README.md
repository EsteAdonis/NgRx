# APM-Demo0

Starter files with no NgRx added.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## NgRx 
### Chapter 1
After the NgRx installation
In app.module
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    StoreModule.forRoot({})
  ],
})

In product.module.ts setup StoreModule

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { productReducer } from './state/product.
reducer';
@NgModule({
  imports: [
    StoreModule.forFeature('products', productReducer)
  ],
})

Defining the reducer under products/state

import { createReducer, on, createAction } from '@ngrx/store';

export const productReducer = createReducer(
  { showProductCode: true },
  on(createAction('[Product] Toggle Product Code'), state => {
    return {
      ...state,
      showProductCode: !state.showProductCode
    };
  })
);

In product-list.component defining ....store, select and dispatcher

constructor(private store: Store<any>, private productService: ProductService) { }

  ngOnInit(): void {

    // TODO: Unsubscribe
    this.store.select('products').subscribe(
      products => {
        if (products) {
          this.displayCode = products.showProductCode;
        }
      });
  }

  checkChanged(): void {
    this.store.dispatch(
      { type: '[Product] Toggle Product Code' }  //This is the action
    );
  }