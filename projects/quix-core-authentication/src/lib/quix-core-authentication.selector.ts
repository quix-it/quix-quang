import {createFeatureSelector} from '@ngrx/store';
import {COREAUTHENTICATION_KEY} from './quix-core-authentication.reducers';

export const quixCoreAuthenticationSelector = createFeatureSelector(COREAUTHENTICATION_KEY)
