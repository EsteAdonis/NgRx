import { createReducer, on, createAction } from '@ngrx/store';
import * as AppState from '../../state/app.state'

export interface UserState extends AppState.State {
  maskUserName: boolean;
}

export const userReducer = createReducer(
  { maskUserName: true },
  on(createAction('[User] Mask User Name'), state => {
    return {
      ...state,
      maskUserName: !state.maskUserName
    };
  })
);
