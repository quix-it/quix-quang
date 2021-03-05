import {createAction} from "@ngrx/store";

export const addLoader = createAction('[LOADER] request start')
export const removeLoader = createAction('[LOADER] response return')
