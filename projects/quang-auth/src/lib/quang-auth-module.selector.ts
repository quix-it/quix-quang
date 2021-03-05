import {createFeatureSelector} from "@ngrx/store";

export const QUANGAUTH_KEY = 'quangAuth'
export const selectQuangAuth = createFeatureSelector(QUANGAUTH_KEY)
