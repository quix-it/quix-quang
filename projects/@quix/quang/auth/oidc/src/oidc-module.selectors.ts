import { createFeatureSelector } from '@ngrx/store'

import { QuangOpenIdConnectModuleState, QuangOpenIdConnectState } from './oidc-module.reducer'

export const QUANGOIDC_KEY = 'quangOpenIdConnect'

export const selectQuangOpenIdConnect = createFeatureSelector<QuangOpenIdConnectModuleState, QuangOpenIdConnectState>(
  QUANGOIDC_KEY
)
