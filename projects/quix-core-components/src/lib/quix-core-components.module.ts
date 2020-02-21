import {ModuleWithProviders, NgModule} from '@angular/core';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {TranslateModule} from '@ngx-translate/core';
import {BsDatepickerModule, BsDropdownModule, ModalModule, TimepickerModule} from 'ngx-bootstrap';
import {CommonModule} from '@angular/common';
import {QuixModalComponent} from './modal/quix-modal.component';
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

@NgModule({
  declarations: [
    QuixModalComponent,
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
    RowSelectorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxWebstorageModule.forRoot(),
    TranslateModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxEchartsModule,
    MatSnackBarModule,
    MatTableModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    MomentModule,
    MatSliderModule,
    MatSlideToggleModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    }),
  ],
  providers: [
    QuixStorageService,
    QuixModalService,
    QuixSnackbarService,
    QuixOfflineService,
    QuixLoaderService,
    {provide: HTTP_INTERCEPTORS, useClass: QuixLoaderInterceptor, multi: true},
    QuixStyleService,
  ],
  exports: [
    QuixModalComponent,
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
    RowSelectorComponent
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

