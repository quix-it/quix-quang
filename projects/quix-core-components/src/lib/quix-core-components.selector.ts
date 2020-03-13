import {createFeatureSelector} from '@ngrx/store';
import {CORECOMPONENTS_KEY} from './quix-core-components.reducers';

export const quixCoreComponentsSelector = createFeatureSelector(CORECOMPONENTS_KEY);
