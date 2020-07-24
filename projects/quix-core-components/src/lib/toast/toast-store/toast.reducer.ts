import {Action, createReducer, on} from '@ngrx/store';
import {openToast} from './toast.action';
import {QuixToast} from "../toasts.model";

export interface ToastsState {
  toastData: QuixToast;
}

export const initialState: ToastsState = {toastData: null};
const reducer = createReducer(
  initialState,
  on(openToast, (state, action) => ({...state, toastData: action.toastData}))
);

export function toastReducer(state: ToastsState | undefined, action: Action) {
  return reducer(state, action);
}
