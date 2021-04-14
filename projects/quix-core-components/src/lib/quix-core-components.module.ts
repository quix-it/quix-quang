import { ModuleWithProviders, NgModule } from '@angular/core'
import { NgxWebstorageModule } from 'ngx-webstorage'
import { TranslateModule } from '@ngx-translate/core'
import { CommonModule } from '@angular/common'
import { QuixStorageService } from './storage/quix-storage.service'
import { QuixModalService } from './modal/quix-modal.service'

import { QuixSnackbarService } from './snackbar/quix-snackbar.service'
import { OSMapComponent } from './osmap/osmap.component'
import { GoogleMapComponent } from './googleMap/google-map.component'
import { InputTextComponent } from './input-text/input-text.component'
import { QuixStyleService } from './style/style.service'
import { FormsModule } from '@angular/forms'
import { TextAreaComponent } from './text-area/text-area.component'
import { InputNumberComponent } from './input-number/input-number.component'
import { InputEmailComponent } from './input-email/input-email.component'
import { InputCheckboxComponent } from './input-checkbox/input-checkbox.component'
import { InputRadioComponent } from './input-radio/input-radio.component'
import { InputDateComponent } from './input-date/input-date.component'
import { InputTimeComponent } from './input-time/input-time.component'
import { InputDateRangeComponent } from './input-date-range/input-date-range.component'
import { InputDateTimeComponent } from './input-date-time/input-date-time.component'
import { MomentModule } from 'ngx-moment'

import { SliderComponent } from './slider/slider.component'
import { ToggleComponent } from './toggle/toggle.component'
import { PictureComponent } from './picture/picture.component'
import { RowSelectorComponent } from './row-selector/row-selector.component'

import { QuixHttpErrorService } from './http-error/quix-http-error.service'
import { InputColorComponent } from './input-color/input-color.component'
import { PaginatorComponent } from './paginator/paginator.component'
import { InputFileComponent } from './input-file/input-file.component'
import { NgxFileDropModule } from 'ngx-file-drop'
import { StoreModule } from '@ngrx/store'
import { CORECOMPONENTS_KEY, quixCoreComponetsReducers } from './quix-core-components.reducers'
import { DataTableComponent } from './data-table/data-table.component'
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator'
import { AutocompleteStrgComponent } from './autocomplete/autocomplete-strg/autocomplete-strg.component'
import { AutocompleteStrgAsyncComponent } from './autocomplete/autocomplete-strg-async/autocomplete-strg-async.component'
import { AutocompleteObjComponent } from './autocomplete/autocomplete-obj/autocomplete-obj.component'
import { AutocompleteObjAsyncComponent } from './autocomplete/autocomplete-obj-async/autocomplete-obj-async.component'
import { InputPasswordComponent } from './input-password/input-password.component'
import { SelectStrgComponent } from './select-strg/select-strg.component'
import { SelectObjComponent } from './select-obj/select-obj.component'
import { ModalModule } from 'ngx-bootstrap/modal'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { TimepickerModule } from 'ngx-bootstrap/timepicker'
import { TypeaheadModule } from 'ngx-bootstrap/typeahead'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSliderModule } from '@angular/material/slider'
import { MatTableModule } from '@angular/material/table'
import { MultiSelectStrgComponent } from './multi-select-strg/multi-select-strg.component'
import { MultiSelectObjComponent } from './multi-select-obj/multi-select-obj.component'
import { ChartLineComponent } from './chart/chart-line/chart-line.component'
import { ChartBarComponent } from './chart/chart-bar/chart-bar.component'
import { MatInputModule } from '@angular/material/input'
import { QuixHttpErrorModalComponent } from './http-error/quix-http-error-modal/quix-http-error-modal.component'
import { LoaderComponent } from './loader/loader/loader.component'
import { InputFractionComponent } from './input-fraction/input-fraction.component'
import * as echarts from 'echarts'
import { NgxEchartsModule } from 'ngx-echarts'
import { VideoComponent } from './video/video.component'
import { QuixThreeSixtyImageComponent } from './quix-three-sixty-image/quix-three-sixty-image.component'
import { LazyLoadImageModule } from 'ng-lazyload-image'
import { QuixOfflineService } from './offline/offline.service'
import { CarouselModule } from 'ngx-bootstrap/carousel'
import { CarouselComponent } from './carousel/carousel.component'
import { ChartAreaComponent } from './chart/chart-area/chart-area.component'
import { ChartDoughnutComponent } from './chart/chart-doughnut/chart-doughnut.component'
import { ChartCandlestickComponent } from './chart/chart-candlestick/chart-candlestick.component'
import { ChartTreemapComponent } from './chart/chart-treemap/chart-treemap.component'
import { ChartRadarComponent } from './chart/chart-radar/chart-radar.component'
import { ChartPieComponent } from './chart/chart-pie/chart-pie.component'
import { QuixToastComponent } from './toast/toast.component'
import { QuixToastService } from './toast/toast.service'
import { CalendarComponent } from './calendar/calendar.component'
import { FullCalendarModule } from '@fullcalendar/angular'
import dayGridPlugin from '@fullcalendar/daygrid'
import bootstrapPlugin from '@fullcalendar/bootstrap'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { InputSearchComponent } from './input-search/input-search.component'
import { ChipsComponent } from './chips/chips.component'
import { MatChipsModule } from '@angular/material/chips'
import { QuixCardActionComponent } from './card/quix-card-action/quix-card-action.component'
import { QuixCardComponent } from './card/quix-card/quix-card.component'
import { QuixCardSimpleComponent } from './card/quix-card-simple/quix-card-simple.component'
import { QuangConfig } from './quang-config.model'
import { PaginatorLanguage } from './paginator/paginator.language'
import { QuixLoaderInterceptor } from './loader/quix-loader.interceptor'
import { QuixHttpErrorInterceptor } from './http-error/quix-http-error.interceptor'
import { QuixEventSourceService } from './event-source/event-source.service'
import { TextEditorComponent } from './text-editor/text-editor.component'
import { QuillModule } from 'ngx-quill'
import { QuixAuthDownloadDirective } from './quix-auth-donwload/quix-auth-download.directive'
import { QuixAuthImageDirective } from './quix-auth-image/quix-auth-image.directive'

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  bootstrapPlugin,
  interactionPlugin,
  timeGridPlugin
])

@NgModule({
  declarations: [
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
    QuixToastComponent,
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
    QuixThreeSixtyImageComponent,
    CarouselComponent,
    ChartAreaComponent,
    ChartDoughnutComponent,
    ChartCandlestickComponent,
    ChartTreemapComponent,
    ChartRadarComponent,
    ChartPieComponent,
    CalendarComponent,
    InputSearchComponent,
    ChipsComponent,
    QuixCardActionComponent,
    QuixCardComponent,
    QuixCardSimpleComponent,
    TextEditorComponent,
    QuixAuthDownloadDirective,
    QuixAuthImageDirective,

  ],
  imports: [
    CommonModule,
    TranslateModule,
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
    CarouselModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    MatPaginatorModule,
    LazyLoadImageModule,
    TypeaheadModule.forRoot(),
    NgxFileDropModule,
    PaginationModule,
    StoreModule.forFeature(CORECOMPONENTS_KEY, quixCoreComponetsReducers),
    MatInputModule,
    NgxEchartsModule.forRoot({ echarts }),
    FullCalendarModule,
    MatChipsModule,
    QuillModule.forRoot(),
  ],
  providers: [
    QuixStorageService,
    QuixModalService,
    QuixSnackbarService,
    QuixOfflineService,
    QuixStyleService,
    QuixHttpErrorService,
    QuixToastService,
    PaginatorLanguage,
    { provide: MatPaginatorIntl, useClass: PaginatorLanguage },
    QuixLoaderInterceptor,
    QuixHttpErrorInterceptor,
    QuixEventSourceService
  ],
  exports: [
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
    QuixToastComponent,
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
    QuixThreeSixtyImageComponent,
    CarouselComponent,
    ChartAreaComponent,
    ChartDoughnutComponent,
    ChartCandlestickComponent,
    ChartTreemapComponent,
    ChartRadarComponent,
    ChartPieComponent,
    CalendarComponent,
    InputSearchComponent,
    ChipsComponent,
    QuixCardActionComponent,
    QuixCardComponent,
    QuixCardSimpleComponent,
    TextEditorComponent,
    QuixAuthDownloadDirective,
    QuixAuthImageDirective
  ],
  entryComponents: [
    QuixHttpErrorModalComponent
  ]
})
export class QuixCoreComponentsModule {
  static forRoot (config: QuangConfig): ModuleWithProviders {
    return {
      ngModule: QuixCoreComponentsModule,
      providers: [
        { provide: QuangConfig, useValue: config }
      ]
    }
  }
}

