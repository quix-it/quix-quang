
import {ActionReducerMap} from "@ngrx/store";
import {QUANGKEYCLOAK_KEY} from "./quang-keycloak-module.selector";
import {
  quangKeycloakUserReducer,
  QuangKeycloakUserState
} from "../quang-keycloak/quang-keycloak-store/quang-keycloak.reducer";


export interface QuangKeycloakState {
  quangKeycloakUserState: QuangKeycloakUserState
}

export interface QuangkeycloakModuleState  {
  [QUANGKEYCLOAK_KEY]: QuangKeycloakState
}

export const quangkeycloakReducer: ActionReducerMap<QuangKeycloakState> = {
  quangKeycloakUserState: quangKeycloakUserReducer
}
