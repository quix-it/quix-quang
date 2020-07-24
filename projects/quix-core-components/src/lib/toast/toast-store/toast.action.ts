import {createAction, props} from '@ngrx/store';
import {QuixToast} from "../toasts.model";


export const openToast = createAction('[TOASTS API] open toast', props<{toastData: QuixToast}>());
