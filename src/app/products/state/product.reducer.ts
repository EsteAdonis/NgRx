import { createReducer, on, createAction } from '@ngrx/store';
import { Product } from '../product';
import * as AppState from '../../state/app.state'
import * as ProductActions from './product.actions';


export interface State extends AppState.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
}

export const productReducer = createReducer<ProductState>(
  initialState,
  on(ProductActions.toggleProductCode, (state: ProductState) => {
    return {
      ...state,
      showProductCode: !state.showProductCode
    };
  }),
  on(ProductActions.setCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProduct: action.product
    }
  }),
  on(ProductActions.clearCurrentProduct, (state: ProductState) => {
    return {
      ...state,
      currentProduct: null
    }
  }),
  on(ProductActions.initializeCurrentProduct, (state: ProductState) => {
    return {
      ...state,
      currentProduct: {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      }
    }
  })


)


