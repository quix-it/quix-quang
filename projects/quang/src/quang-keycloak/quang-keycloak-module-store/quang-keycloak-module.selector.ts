import {createFeatureSelector} from "@ngrx/store";

export const QUANGKEYCLOAK_KEY = 'quangkeycloak'
export const selectQuangKeycloak = createFeatureSelector(QUANGKEYCLOAK_KEY)
