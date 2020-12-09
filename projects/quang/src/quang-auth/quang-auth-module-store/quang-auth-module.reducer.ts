import {
  quangAuthUserReducer,
  QuangAuthUserState
} from "../quang-auth/qunag-auth-store/quang-auth.reducer";
import {AppState} from "../../app-store/app.reducers";
import {QUANGAUTH_KEY} from "./quang-auth-module.selector";
import {ActionReducerMap} from "@ngrx/store";


export interface QuangAuthState {
  quangAuthUserState: QuangAuthUserState
}

export interface QuangAuthModuleState extends AppState {
  [QUANGAUTH_KEY]: QuangAuthState
}

export const quangAuthReducer: ActionReducerMap<QuangAuthState> = {
  quangAuthUserState: quangAuthUserReducer
}
