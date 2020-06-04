import {ModuleWithProviders, NgModule} from '@angular/core';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {QuixStorageService} from './storage/quix-storage.service';
import {QuixModalService} from './modal/quix-modal.service';

import {QuixSnackbarService} from './snackbar/quix-snackbar.service';
import {QuixOfflineService} from './offline/quix-offline.service';
import {PieComponent} from './pie/pie.component';
import {OSMapComponent} from './osmap/osmap.component';
import {GoogleMapComponent} from './googleMap/google-map.component';
import {QuixConfigModel} from './quix-config.model';
import {InputTextComponent} from './input-text/input-text.component';
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

import {QuixHttpErrorService} from './http-error/quix-http-error.service';
import {InputColorComponent} from './input-color/input-color.component';
import {QuixToastsService} from './toast/quix-toasts.service';
import {PaginatorComponent} from './paginator/paginator.component';
import {InputFileComponent} from './input-file/input-file.component';
import {ToastsComponent} from './toast/toasts.component';
import {NgxFileDropModule} from 'ngx-file-drop';
import {StoreModule} from '@ngrx/store';
import {CORECOMPONENTS_KEY, quixCoreComponetsReducers} from './quix-core-components.reducers';
import {DataTableComponent} from "./data-table/data-table.component";
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {PaginatorLanguage} from "./paginator/paginatorLanguage";
import {AutocompleteStrgComponent} from "./autocomplete/autocomplete-strg/autocomplete-strg.component";
import {AutocompleteStrgAsyncComponent} from "./autocomplete/autocomplete-strg-async/autocomplete-strg-async.component";
import {AutocompleteObjComponent} from "./autocomplete/autocomplete-obj/autocomplete-obj.component";
import {AutocompleteObjAsyncComponent} from "./autocomplete/autocomplete-obj-async/autocomplete-obj-async.component";
import {InputPasswordComponent} from "./input-password/input-password.component";
import {SelectStrgComponent} from "./select-strg/select-strg.component";
import {SelectObjComponent} from "./select-obj/select-obj.component";
import {ModalModule} from "ngx-bootstrap/modal";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {TimepickerModule} from "ngx-bootstrap/timepicker";
import {TypeaheadModule} from "ngx-bootstrap/typeahead";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSliderModule} from "@angular/material/slider";
import {MatTableModule} from "@angular/material/table";
import {MultiSelectStrgComponent} from "./multi-select-strg/multi-select-strg.component";
import {MultiSelectObjComponent} from "./multi-select-obj/multi-select-obj.component";
import {ChartLineComponent} from "./chart-line/chart-line.component";
import {ChartBarComponent} from "./chart-bar/chart-bar.component";
import {MatInputModule} from "@angular/material/input";
import {QuixHttpErrorModalComponent} from "./http-error/quix-http-error-modal/quix-http-error-modal.component";
import {LoaderComponent} from "./loader/loader/loader.component";
import {InputFractionComponent} from "./input-fraction/input-fraction.component";
import * as echarts from 'echarts';
import {NgxEchartsModule} from "ngx-echarts";
import {VideoComponent} from "./video/video.component";
import {QuixThreeSixtyImageComponent} from "./quix-three-sixty-image/quix-three-sixty-image.component";
@NgModule({
  declarations: [
    PieComponent,
    DataTableComponent,
    OSMapComponent,
    GoogleMapComponent,
    InputTextComponent,
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
    InputFileComponent,
    ToastsComponent,
    PaginatorComponent,
    InputColorComponent,
    AutocompleteStrgComponent,
    AutocompleteStrgAsyncComponent,
    AutocompleteObjComponent,
    AutocompleteObjAsyncComponent,
    InputPasswordComponent,
    SelectStrgComponent,
    SelectObjComponent,
    MultiSelectObjComponent,
    MultiSelectStrgComponent,
    ChartLineComponent,
    ChartBarComponent,
    LoaderComponent,
    InputFractionComponent,
    QuixHttpErrorModalComponent,
    VideoComponent,
    QuixThreeSixtyImageComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    NgxWebstorageModule.forRoot(),
    FormsModule,
    MomentModule,
    MatSnackBarModule,
    MatTableModule,
    MatSliderModule,
    MatSlideToggleModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    PaginationModule.forRoot(),
    MatPaginatorModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    }),
    TypeaheadModule.forRoot(),
    NgxFileDropModule,
    PaginationModule,
    StoreModule.forFeature(CORECOMPONENTS_KEY, quixCoreComponetsReducers),
    MatInputModule,
    NgxEchartsModule.forRoot({echarts}),
  ],
  providers: [
    QuixStorageService,
    QuixModalService,
    QuixSnackbarService,
    QuixOfflineService,
    // {provide: HTTP_INTERCEPTORS, useClass: QuixLoaderInterceptor, multi: true},
    // {provide: HTTP_INTERCEPTORS, useClass: QuixHttpErrorInterceptor, multi: true},
    QuixStyleService,
    QuixHttpErrorService,
    QuixToastsService,
    PaginatorLanguage,
    {provide: MatPaginatorIntl, useClass: PaginatorLanguage}
  ],
  exports: [
    PieComponent,
    DataTableComponent,
    OSMapComponent,
    GoogleMapComponent,
    InputTextComponent,
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
    QuixHttpErrorModalComponent,
    InputFileComponent,
    ToastsComponent,
    PaginatorComponent,
    InputColorComponent,
    AutocompleteStrgComponent,
    AutocompleteStrgAsyncComponent,
    AutocompleteObjComponent,
    AutocompleteObjAsyncComponent,
    InputPasswordComponent,
    SelectStrgComponent,
    SelectObjComponent,
    MultiSelectObjComponent,
    MultiSelectStrgComponent,
    ChartLineComponent,
    ChartBarComponent,
    LoaderComponent,
    InputFractionComponent,
    VideoComponent,
    QuixThreeSixtyImageComponent
  ],
  entryComponents: [
    QuixHttpErrorModalComponent
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

