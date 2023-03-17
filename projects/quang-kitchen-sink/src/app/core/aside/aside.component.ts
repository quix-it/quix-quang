import { Component, OnInit } from '@angular/core'
import { FlatTreeControl } from '@angular/cdk/tree'
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree'

interface ExampleFlatNode {
  expandable: boolean
  name: string
  level: number
}

interface MenuNode {
  name: string
  url?: string
  children?: MenuNode[]
}

@Component({
  selector: 'ks-aside',
  templateUrl: './aside.component.html',
  styles: []
})
export class AsideComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private _transformer(node: MenuNode, level: number) {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      url: node.url,
      level: level
    }
  }

  treeControl = new FlatTreeControl<any>(
    (node) => node.level,
    (node) => node.expandable
  )

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  )

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener)

  hasChild(_: number, node: ExampleFlatNode) {
    return node.expandable
  }

  ngOnInit(): void {
    this.dataSource.data = [
      {
        name: 'Training JS',
        children: [
          { name: 'Array', url: 'js/array' },
          { name: 'Map', url: 'js/map' }
        ]
      },
      {
        name: 'Training Form',
        children: [
          { name: 'Form control', url: 'form/control' },
          { name: 'Form group', url: 'form/group' },
          { name: 'Form group group', url: 'form/group-group' },
          { name: 'Form group array', url: 'form/group-array' },
          { name: 'Form array', url: 'form/array' },
          { name: 'Form array group', url: 'form/array-group' },
          { name: 'Form array array', url: 'form/array-array' },
          { name: 'Form sync validator', url: 'form/sync-validator' },
          { name: 'Form async validator', url: 'form/async-validator' }
        ]
      },
      {
        name: 'Training Lib',
        children: [
          { name: 'Code Mirror', url: 'lib/codemirror' },
          { name: 'Clipboard', url: 'lib/clipboard' },
          { name: 'Excel', url: 'lib/excel' },
          { name: 'Pdf', url: 'lib/pdf' },
          { name: 'Ngx mask', url: 'lib/mask' },
          { name: 'Swiper', url: 'lib/swiper' },
          { name: 'Date fns', url: 'lib/date' },
          { name: 'Infinite scroll', url: 'lib/infinite' },
          { name: 'Virtual scroll', url: 'lib/virtual' },
          { name: 'Platform', url: 'lib/platform' },
          { name: 'Drag & Drop', url: 'lib/d&d' },
          { name: 'Image cropper', url: 'lib/cropper' },
          { name: 'vConsole', url: 'lib/vconsole' },
          { name: 'Image cropper', url: 'lib/cropper' },
          { name: 'Transloco', url: 'lib/transloco' },
          { name: 'Data table', url: 'lib/datatable' }
        ]
      },
      {
        name: 'Training Scroll',
        children: [
          { name: 'ngFor', url: 'scroll/for' },
          { name: 'Scroll', url: 'scroll/scroll' },
          { name: 'Intersection', url: 'scroll/intersection' }
        ]
      },
      {
        name: 'Training Ngrx',
        children: [
          { name: 'Starships', url: 'ngrx/starships' },
          { name: 'Planets', url: 'ngrx/planets' }
        ]
      },
      {
        name: 'Quang calendar',
        children: [{ name: 'Quang calendar', url: 'quang-calendar/calendar' }]
      },
      {
        name: 'Quang chart',
        children: [
          { name: 'Quang chart area', url: 'quang-chart/area' },
          { name: 'Quang chart bar', url: 'quang-chart/bar' },
          { name: 'Quang chart line', url: 'quang-chart/line' },
          { name: 'Quang chart pie', url: 'quang-chart/pie' },
          { name: 'Quang chart doughnut', url: 'quang-chart/doughnut' },
          { name: 'Quang chart radar', url: 'quang-chart/radar' },
          { name: 'Quang chart treemap', url: 'quang-chart/treemap' },
          { name: 'Quang chart candlestick', url: 'quang-chart/candlestick' },
          { name: 'Quang chart gauge', url: 'quang-chart/gauge' },
          { name: 'Quang chart tree', url: 'quang-chart/tree' }
        ]
      },
      {
        name: 'Quang components',
        children: [
          { name: 'Quang card', url: 'quang-components/card' },
          { name: 'Quang card action', url: 'quang-components/card-action' },
          {
            name: 'Quang card action header',
            url: 'quang-components/card-action-header'
          },
          { name: 'Quang card header', url: 'quang-components/card-header' },
          { name: 'Quang card simple', url: 'quang-components/card-simple' },
          { name: 'Quang card image', url: 'quang-components/card-image' }
        ]
      },
      {
        name: 'Quang core',
        children: [
          { name: 'Quang text editor', url: 'quang-core/texteditor' },
          { name: 'Quang datalist', url: 'quang-core/datalist' },
          { name: 'Quang input checkbox', url: 'quang-core/checkbox' },
          { name: 'Quang input color', url: 'quang-core/color' },
          { name: 'Quang input email', url: 'quang-core/email' },
          { name: 'Quang input file', url: 'quang-core/file' },
          { name: 'Quang input fraction', url: 'quang-core/fraction' },
          { name: 'Quang input number', url: 'quang-core/number' },
          { name: 'Quang input password', url: 'quang-core/password' },
          { name: 'Quang input radio', url: 'quang-core/radio' },
          { name: 'Quang input search', url: 'quang-core/search' },
          { name: 'Quang input tel', url: 'quang-core/tel' },
          { name: 'Quang input text', url: 'quang-core/text' },
          { name: 'Quang input url', url: 'quang-core/url' },
          {
            name: 'Quang multi-select obj',
            url: 'quang-core/multi-select-obj'
          },
          {
            name: 'Quang multi-select strg',
            url: 'quang-core/multi-select-strg'
          },
          { name: 'Quang paginator', url: 'quang-core/paginator' },
          {
            name: 'Quang paginator service',
            url: 'quang-core/paginatorservice'
          },
          { name: 'Quang select obj', url: 'quang-core/select-obj' },
          { name: 'Quang select strg', url: 'quang-core/select-strg' },
          { name: 'Quang slider', url: 'quang-core/slider' },
          { name: 'Quang text area', url: 'quang-core/textarea' },
          { name: 'Quang text editor', url: 'quang-core/texteditor' },
          { name: 'Quang toggle', url: 'quang-core/toggle' },
          {
            name: 'Quang autocomplete strg',
            url: 'quang-core/autocomplete-strg'
          },
          {
            name: 'Quang autocomplete strg async',
            url: 'quang-core/autocomplete-strg-async'
          },
          {
            name: 'Quang autocomplete obj ',
            url: 'quang-core/autocomplete-obj'
          },
          {
            name: 'Quang autocomplete obj async',
            url: 'quang-core/autocomplete-obj-async'
          },
          { name: 'Quang auth download', url: 'quang-core/auth-download' },
          { name: 'Quang auth image', url: 'quang-core/auth-image' },
          { name: 'Custom icons', url: 'quang-core/custom-icons' }
        ]
      },
      {
        name: 'Quang date',
        children: [
          { name: 'Quang input date', url: 'quang-date/date' },
          { name: 'Quang input date range', url: 'quang-date/date-range' },
          { name: 'Quang input datetime', url: 'quang-date/date-time' },
          { name: 'Quang input time', url: 'quang-date/time' }
        ]
      },
      {
        name: 'Quang dialog',
        children: [
          { name: 'Quang loader', url: 'quang-dialog/loader' },
          { name: 'Quang skeleton', url: 'quang-dialog/skeleton' },
          { name: 'Quang toast', url: 'quang-dialog/toast' },
          { name: 'Quang Modal Service', url: 'quang-dialog/modal' },
          { name: 'Quang snackbar Service', url: 'quang-dialog/snackbar' },
          { name: 'Quang http error', url: 'quang-dialog/error' },
          { name: 'Quang bottom sheet', url: 'quang-dialog/bottom' },
          {
            name: 'Quang notification service',
            url: 'quang-dialog/notification'
          }
        ]
      },
      {
        name: 'Quang utility',
        children: [
          { name: 'Quang layout Service', url: 'quang-utility/layout' },
          { name: 'Quang storage Service', url: 'quang-utility/storage' },
          { name: 'Quang validators Service', url: 'quang-utility/validators' },
          { name: 'Quang device Service', url: 'quang-utility/device' },
          { name: 'Quang device motion Service', url: 'quang-utility/motion' },
          { name: 'Quang page Service', url: 'quang-utility/page' }
        ]
      },
      {
        name: 'Quang media',
        children: [
          { name: 'Quang picture', url: 'quang-image/picture' },
          { name: 'Quang video', url: 'quang-image/video' },
          { name: 'Quang three sixty', url: 'quang-image/threesixty' },
          { name: 'Code reader', url: 'quang-image/codereader' },
          { name: 'Quang audio', url: 'quang-image/audio' },
          { name: 'Quang webcam', url: 'quang-image/webcam' }
        ]
      },
      {
        name: 'Quang event',
        children: [
          { name: 'Quang event bus', url: 'quang-event/bus' },
          { name: 'Quang event source', url: 'quang-event/source' },
          { name: 'Quang WebSocket', url: 'quang-event/websocket' }
        ]
      },
      {
        name: 'Quang map',
        children: [
          { name: 'Google map', url: 'quang-map/google' },
          { name: 'Open street map', url: 'quang-map/os' }
        ]
      },
      {
        name: 'Quang keycloak',
        children: [
          { name: 'Configurazione', url: 'quang-keycloak/config' },
          { name: 'Direttive', url: 'quang-keycloak/directive' },
          { name: 'Guardie', url: 'quang-keycloak/guard' },
          { name: 'Selettori', url: 'quang-keycloak/selector' }
        ]
      },
      {
        name: 'Quang auth',
        children: [
          { name: 'Configurazione', url: 'quang-auth/config' },
          { name: 'Direttive', url: 'quang-auth/directive' },
          { name: 'Guardie', url: 'quang-auth/guard' },
          { name: 'Selettori', url: 'quang-auth/selector' }
        ]
      },
      {
        name: 'Accessibility',
        children: [
          { name: 'Form', url: 'accessibility/form' },
          { name: 'Master', url: 'accessibility/master' }
        ]
      }
    ]
  }
}
