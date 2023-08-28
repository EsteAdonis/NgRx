import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Product } from '../product';
import { Store } from '@ngrx/store';
import { State } from '../state/product.reducer';
import * as ProductSelect from '../state/product.selectors';
import * as ProductActions from '../state/product.actions';

@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {

  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.products$ = this.store.select(ProductSelect.getProducts);
    this.errorMessage$ = this.store.select(ProductSelect.getError);
    this.store.dispatch(ProductActions.loadProducts());    
    this.selectedProduct$ = this.store.select(ProductSelect.getCurrentProduct);
    // TODO: Unsubscribe
    this.displayCode$ = this.store.select(ProductSelect.getShowProductCode);
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode()); // This is the action
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({ currentProductId: product.id }));
  }

}
