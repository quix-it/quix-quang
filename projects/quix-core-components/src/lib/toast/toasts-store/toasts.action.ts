import {createAction, props} from '@ngrx/store';
import {ToastsModel} from '../toasts.model';

export const openToast = createAction('[TOASTS API] open toast', props<{toastData: ToastsModel}>());
