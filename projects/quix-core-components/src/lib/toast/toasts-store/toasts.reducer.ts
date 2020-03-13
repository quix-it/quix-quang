import {ToastsModel} from '../toasts.model';
import {Action, createReducer, on} from '@ngrx/store';
import * as ToastsAction from './toasts.action';
import {openToast} from './toasts.action';

export interface ToastsState {
  toastData: ToastsModel;
}

export const initialState: ToastsState = {toastData: null};
const toastsReducer = createReducer(
  initialState,
  on(openToast, (state, action) => ({...state, toastData: action.toastData}))
);

export function toastReducer(state: ToastsState | undefined, action: Action) {
  return toastsReducer(state, action);
}
