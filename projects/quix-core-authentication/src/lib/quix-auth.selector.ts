import {createFeatureSelector} from '@ngrx/store';
import {COREAUTHENTICATION_KEY} from './quix-auth.reducers';

export const quixAuthSelector = createFeatureSelector(COREAUTHENTICATION_KEY)
