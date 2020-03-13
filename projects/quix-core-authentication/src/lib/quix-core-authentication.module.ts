import {ModuleWithProviders, NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {QuixCoreAuthenticationModel} from './quix-core-authentication.model';
import {CommonModule} from '@angular/common';
import {QuixWindowService} from './window/quix-window.service';
import {QuixAuthService} from './auth/quix-auth.service';
import {COREAUTHENTICATION_KEY, QuixCoreAuthenticationReducers} from './quix-core-authentication.reducers';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(COREAUTHENTICATION_KEY, QuixCoreAuthenticationReducers)
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
