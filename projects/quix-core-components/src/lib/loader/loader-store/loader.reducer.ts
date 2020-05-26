import {Action, createReducer, on} from "@ngrx/store";
import {addLoader, removeLoader} from "./loader.action";

export interface LoaderState {
  loaders: number
}

const initialState: LoaderState = {
  loaders: 0
}
const reducer = createReducer(
  initialState,
  on(addLoader, (state) => ({...state, loaders: state.loaders + 1})),
  on(removeLoader, (state) => ({...state, loaders: state.loaders - 1}))
)

export function loaderReducer(state: LoaderState | undefined, action: Action) {
  return reducer(state, action)
}
