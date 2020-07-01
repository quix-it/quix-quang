
import {ActionReducerMap} from '@ngrx/store';
import {userReducer, UserState} from "./store/user.reducer";

export const COREAUTHENTICATION_KEY = 'quixAuth';

export interface QuixAuthState {
  userState: UserState;
}

export interface QuixAuthStateModule {
  [COREAUTHENTICATION_KEY]: QuixAuthState;
}

export const QuixAuthReducers: ActionReducerMap<QuixAuthState> = {
  userState: userReducer,
};
