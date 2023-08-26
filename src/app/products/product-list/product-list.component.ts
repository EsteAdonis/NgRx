import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store } from '@ngrx/store';
import { State } from '../state/product.reducer';
import { getCurrentProduct, getShowProductCode } from '../state/product.selectors';
import * as ProductActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(private store: Store<State>, private productService: ProductService) { }

  ngOnInit(): void {
    this.store.select(getCurrentProduct).subscribe(
      getCurrentProduct => this.selectedProduct = getCurrentProduct
    );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: err => this.errorMessage = err
    });

    // TODO: Unsubscribe
    this.store.select(getShowProductCode).subscribe(
      showProductCode => this.displayCode = showProductCode
    );
  }

  checkChanged(): void {
    this.store.dispatch(
      ProductActions.toggleProductCode() // This is the action
    );
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({ product }));
  }

}
