import {ModuleWithProviders, NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {QUIX_AUTH_STATE, quixAuthReducers} from './auth/quix-auth.reducers';
import {QuixCoreAuthenticationModel} from './quix-core-authentication.model';
import {CommonModule} from '@angular/common';
import {QuixWindowService} from './window/quix-window.service';
import {QuixAuthService} from './auth/quix-auth.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(QUIX_AUTH_STATE, quixAuthReducers)
  ],
  providers: [
    QuixWindowService,
    QuixAuthService
  ],
  exports: []
})
export class QuixCoreAuthenticationModule {
  static forRoot(config: QuixCoreAuthenticationModel): ModuleWithProviders {
    return {
      ngModule: QuixCoreAuthenticationModule,
      providers: [
        {provide: QuixCoreAuthenticationModel, useValue: config}
      ]
    };
  }
}
