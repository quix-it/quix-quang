import { QUANGAUTH_KEY } from './quang-auth-module.selector'
import { ActionReducerMap } from '@ngrx/store'
import { quangAuthUserReducer, QuangAuthUserState } from './quang-auth-store/quang-auth.reducer'

export interface QuangAuthState {
  quangAuthUserState: QuangAuthUserState
}

export interface QuangAuthModuleState {
  [QUANGAUTH_KEY]: QuangAuthState
}

export const quangAuthReducer: ActionReducerMap<QuangAuthState> = {
  quangAuthUserState: quangAuthUserReducer
}
