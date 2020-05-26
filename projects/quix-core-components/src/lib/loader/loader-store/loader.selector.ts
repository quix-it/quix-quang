import {createSelector} from "@ngrx/store";
import {quixCoreComponentsSelector} from "../../quix-core-components.selector";
import {QuixCoreComponentsState} from "../../quix-core-components.reducers";

export const selectLoader = createSelector(quixCoreComponentsSelector,(state:QuixCoreComponentsState)=>state.loaderState?.loaders)
