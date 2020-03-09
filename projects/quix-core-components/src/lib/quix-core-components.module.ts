import {ModuleWithProviders, NgModule} from '@angular/core';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {TranslateModule} from '@ngx-translate/core';
import {
  BsDatepickerModule,
  BsDropdownModule,
  ModalModule,
  PaginationConfig, PaginationModule,
  TimepickerModule,
  TypeaheadModule
} from 'ngx-bootstrap';
import {CommonModule} from '@angular/common';
import {QuixStorageService} from './storage/quix-storage.service';
import {QuixModalService} from './modal/quix-modal.service';
import {NgxEchartsModule} from 'ngx-echarts';
import {ChartComponent} from './chart/chart.component';
import {QuixSnackbarService} from './snackbar/quix-snackbar.service';
import {QuixOfflineService} from './offline/quix-offline.service';
import {QuixLoaderService} from './loader/quix-loader.service';
import {QuixLoaderInterceptor} from './loader/quix-loader.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {PieComponent} from './pie/pie.component';
import {MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatTableModule} from '@angular/material';
import {DataTableComponent} from './data-table/data-table.component';
import {OSMapComponent} from './osmap/osmap.component';
import {GoogleMapComponent} from './googleMap/google-map.component';
import {QuixConfigModel} from './quix-config.model';
import {InputTextComponent} from './input-text/input-text.component';
import {SelectComponent} from './select/select.component';
import {QuixStyleService} from './style/style.service';
import {FormsModule} from '@angular/forms';
import {TextAreaComponent} from './text-area/text-area.component';
import {InputNumberComponent} from './input-number/input-number.component';
import {InputEmailComponent} from './input-email/input-email.component';
import {InputCheckboxComponent} from './input-checkbox/input-checkbox.component';
import {InputRadioComponent} from './input-radio/input-radio.component';
import {InputDateComponent} from './input-date/input-date.component';
import {InputTimeComponent} from './input-time/input-time.component';
import {InputDateRangeComponent} from './input-date-range/input-date-range.component';
import {InputDateTimeComponent} from './input-date-time/input-date-time.component';
import {MomentModule} from 'ngx-moment';
import {intersectionObserverPreset, LazyLoadImageModule} from 'ng-lazyload-image';
import {SliderComponent} from './slider/slider.component';
import {ToggleComponent} from './toggle/toggle.component';
import {PictureComponent} from './picture/picture.component';
import {RowSelectorComponent} from './row-selector/row-selector.component';
import {QuixHttpErrorComponent} from './http-error/quix-http-error.component';
import {QuixHttpErrorService} from './http-error/quix-http-error.service';
import {QuixHttpErrorInterceptor} from './http-error/quix-http-error.interceptor';
import {QuixValidationService} from './validation/quix-validation.service';
import {AutocompleteComponent} from "./input-autocomplete/autocomplete.component";
import {InputFileComponent} from "./input-file/input-file.component";
import {ToastsComponent} from "./toast/toasts.component";
import {ToastsService} from "./toast/toasts.service";
import {NgxFileDropModule} from "ngx-file-drop";
import {PaginatorComponent} from "./paginator/paginator.component";
import {InputColorComponent} from './input-color/input-color.component';

@NgModule({
  declarations: [
    ChartComponent,
    PieComponent,
    DataTableComponent,
    OSMapComponent,
    GoogleMapComponent,
    InputTextComponent,
    SelectComponent,
    TextAreaComponent,
    InputNumberComponent,
    InputEmailComponent,
    InputCheckboxComponent,
    InputRadioComponent,
    InputDateComponent,
    InputTimeComponent,
    InputDateRangeComponent,
    InputDateTimeComponent,
    SliderComponent,
    ToggleComponent,
    PictureComponent,
    RowSelectorComponent,
    QuixHttpErrorComponent,
    AutocompleteComponent,
    InputFileComponent,
    ToastsComponent,
    PaginatorComponent,
    InputColorComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    NgxWebstorageModule.forRoot(),
    FormsModule,
    MomentModule,
    NgxEchartsModule,
    MatSnackBarModule,
    MatTableModule,
    MatSliderModule,
    MatSlideToggleModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    }),
    TypeaheadModule.forRoot(),
    NgxFileDropModule,
    PaginationModule
  ],
  providers: [
    QuixStorageService,
    QuixModalService,
    QuixSnackbarService,
    QuixOfflineService,
    QuixLoaderService,
    {provide: HTTP_INTERCEPTORS, useClass: QuixLoaderInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: QuixHttpErrorInterceptor, multi: true},
    QuixStyleService,
    QuixHttpErrorService,
    QuixValidationService,
    ToastsService
  ],
  exports: [
    ChartComponent,
    PieComponent,
    DataTableComponent,
    OSMapComponent,
    GoogleMapComponent,
    InputTextComponent,
    SelectComponent,
    TextAreaComponent,
    InputNumberComponent,
    InputEmailComponent,
    InputCheckboxComponent,
    InputRadioComponent,
    InputDateComponent,
    InputTimeComponent,
    InputDateRangeComponent,
    InputDateTimeComponent,
    SliderComponent,
    ToggleComponent,
    PictureComponent,
    RowSelectorComponent,
    QuixHttpErrorComponent,
    AutocompleteComponent,
    InputFileComponent,
    ToastsComponent,
    PaginatorComponent,
    InputColorComponent
  ],
  entryComponents: [
    QuixHttpErrorComponent
  ]
})
export class QuixCoreComponentsModule {
  static forRoot(config: QuixConfigModel): ModuleWithProviders {
    return {
      ngModule: QuixCoreComponentsModule,
      providers: [
        {provide: QuixConfigModel, useValue: config}
      ]
    };
  }
}

