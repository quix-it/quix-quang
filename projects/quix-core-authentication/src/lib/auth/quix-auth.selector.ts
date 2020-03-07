import {createFeatureSelector} from '@ngrx/store';
import { QUIX_AUTH_STATE} from './quix-auth.reducers';

export const selectAuthState = createFeatureSelector(QUIX_AUTH_STATE)
