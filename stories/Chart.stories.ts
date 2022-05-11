import { BlankComponent } from './blank.component'
import { color, number, withKnobs } from '@storybook/addon-knobs'
import { moduleMetadata } from '@storybook/angular'
import { TranslocoModule } from '@ngneat/transloco'
import { CommonModule } from '@angular/common'
import { Meta, Story } from '@storybook/angular/types-6-0'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { NgxEchartsModule } from 'ngx-echarts'
import { ChartAreaComponent } from '../projects/quang-chart/src/lib/chart-area/chart-area.component'
import { ChartArea } from '../projects/quang-chart/src/lib/chart-area/chart-area.model'
import { ChartBarComponent } from '../projects/quang-chart/src/lib/chart-bar/chart-bar.component'
import { ChartBar } from '../projects/quang-chart/src/lib/chart-bar/chart-bar.model'
import {
  ChartCandlestickComponent
} from '../projects/quang-chart/src/lib/chart-candlestick/chart-candlestick.component'
import { ChartCandlestick } from '../projects/quang-chart/src/lib/chart-candlestick/chart-candlestick.model'
import { ChartDoughnutComponent } from '../projects/quang-chart/src/lib/chart-doughnut/chart-doughnut.component'
import { ChartDoughnut } from '../projects/quang-chart/src/lib/chart-doughnut/chart-doughnut.model'
import { ChartGauge } from '../projects/quang-chart/src/lib/chart-gauge/chart-gauge.model'
import { ChartGaugeComponent } from '../projects/quang-chart/src/lib/chart-gauge/chart-gauge.component'
import { ChartLineComponent } from '../projects/quang-chart/src/lib/chart-line/chart-line.component'
import { ChartPieComponent } from '../projects/quang-chart/src/lib/chart-pie/chart-pie.component'
import { ChartPie } from '../projects/quang-chart/src/lib/chart-pie/chart-pie.model'
import { ChartRadarComponent } from '../projects/quang-chart/src/lib/chart-radar/chart-radar.component'
import { ChartRadar, ChartRadarIndicator } from '../projects/quang-chart/src/lib/chart-radar/chart-radar.model'
import { ChartTreeComponent } from '../projects/quang-chart/src/lib/chart-tree/chart-tree.component'
import { ChartTree } from '../projects/quang-chart/src/lib/chart-tree/chart-tree.model'
import { ChartTreemapComponent } from '../projects/quang-chart/src/lib/chart-treemap/chart-treemap.component'
import { ChartTreemap } from '../projects/quang-chart/src/lib/chart-treemap/chart-treemap.model'

export default {
  title: 'Chart',
  component: BlankComponent,
  subcomponents: {
    ChartAreaComponent,
    ChartBarComponent,
    ChartCandlestickComponent,
    ChartDoughnutComponent,
    ChartGaugeComponent,
    ChartLineComponent,
    ChartPieComponent,
    ChartRadarComponent,
    ChartTreeComponent,
    ChartTreemapComponent
  },
  decorators: [withKnobs, moduleMetadata({
    declarations: [
      BlankComponent,
      ChartAreaComponent,
      ChartBarComponent,
      ChartCandlestickComponent,
      ChartDoughnutComponent,
      ChartGaugeComponent,
      ChartLineComponent,
      ChartPieComponent,
      ChartRadarComponent,
      ChartTreeComponent,
      ChartTreemapComponent
    ],
    imports: [
      TranslocoModule,
      CommonModule,
      NgxEchartsModule.forRoot({ echarts: () => import('echarts') })
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  })]
} as Meta

const Area: Story<BlankComponent> = (args: BlankComponent) => {
  const data = new ChartArea(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    [
      [820, 932, 901, 934, 1290, 1330, 1320],
      [82, 93, 90, 93, 129, 133, 132]
    ])

  return {
    component: BlankComponent,
    template:
      `
            <section class="container-fluid">
              <div class="row mb-3">
                <div class="col">
                  <div class="card">
                    <div class="card-header">
                    <div class="row">
                        <div class="col-6">
                            <h3>Quang chart area</h3>
                        </div>
                        <div class="col-6 text-end">
                            <a cardAction href="https://rd.quix.it/quang/components/ChartAreaComponent.html">Configurazioni</a>
                        </div>
                    </div>
                    </div>
                    <div class="card-body">
                        <quang-chart-area
                          [id]="'test'"
                          [height]="'70vh'"
                          [chartData]="data"
                          [color]="[firstColor, secondColor]"
                          (chartClick)="onCLick($event)"
                        ></quang-chart-area>
                    </div>
                  </div>
                </div>
              </div>
            </section>
    `,
    props: {
      ...args,
      data: data,
      firstColor: color('firstColor', '#3e885b'),
      secondColor: color('secondColor', '#debac0'),
      onCLick (e: any): void {
        alert(`${e.type} ${e.data} ${e.seriesName}`)
      },
    }
  }
}
const Bar: Story<BlankComponent> = (args: BlankComponent) => {

  const data = new ChartBar(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    [[820, 932, 901, 934, 1290, 1330, 1320], [82, 93, 90, 93, 129, 133, 132]])

  return {
    component: BlankComponent,
    template:
      `
            <section class="container-fluid">
              <div class="row mb-3">
                <div class="col">
                  <div class="card">
                    <div class="card-header">
                    <div class="row">
                        <div class="col-6">
                            <h3>Quang chart bar</h3>
                        </div>
                        <div class="col-6 text-end">
                            <a cardAction href="https://rd.quix.it/quang/components/ChartBarComponent.html">Configurazioni</a>
                        </div>
                    </div>
                    </div>
                    <div class="card-body">
                        <quang-chart-bar
                          [id]="'test'"
                          [height]="'70vh'"
                          [chartData]="data"
                          [color]="[firstColor, secondColor]"
                          (chartClick)="onCLick($event)"
                        ></quang-chart-bar>
                    </div>
                  </div>
                </div>
              </div>
            </section>
    `,
    props: {
      ...args,
      data: data,
      firstColor: color('firstColor', '#3e885b'),
      secondColor: color('secondColor', '#debac0'),
      onCLick (e: any): void {
        alert(`${e.type} ${e.data} ${e.seriesName}`)
      },
    }
  }
}
const Candle: Story<BlankComponent> = (args: BlankComponent) => {

  const data = new ChartCandlestick(
    ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27'],
    [
      [20, 34, 10, 38],
      [40, 35, 30, 50],
      [1, 10, 30, 50],
      [40, 35, 30, 50]
    ]
  )

  return {
    component: BlankComponent,
    template:
      `
            <section class="container-fluid">
              <div class="row mb-3">
                <div class="col">
                  <div class="card">
                    <div class="card-header">
                    <div class="row">
                        <div class="col-6">
                            <h3>Quang chart candlestick</h3>
                        </div>
                        <div class="col-6 text-end">
                            <a cardAction href="https://rd.quix.it/quang/components/ChartCandlestickComponent.html">Configurazioni</a>
                        </div>
                    </div>
                    </div>
                    <div class="card-body">
                        <quang-chart-candlestick
                          [id]="'test'"
                          [height]="'70vh'"
                          [chartData]="data"
                          [colors]="[firstColor, secondColor]"
                          (chartClick)="onCLick($event)"
                        ></quang-chart-candlestick>
                    </div>
                  </div>
                </div>
              </div>
            </section>
    `,
    props: {
      ...args,
      data: data,
      firstColor: color('firstColor', '#debac0'),
      secondColor: color('secondColor', '#3e885b'),
      onCLick (e: any): void {
        alert(`${e.type} ${e.data} ${e.seriesName}`)
      },
    }
  }
}
const Doughnut: Story<BlankComponent> = (args: BlankComponent) => {
  const data = [
    new ChartDoughnut(335, 'uno'),
    new ChartDoughnut(310, 'due'),
    new ChartDoughnut(234, 'tre'),
    new ChartDoughnut(135, 'quattro'),
    new ChartDoughnut(1548, 'cinque')
  ]

  return {
    component: BlankComponent,
    template:
      `
            <section class="container-fluid">
              <div class="row mb-3">
                <div class="col">
                  <div class="card">
                    <div class="card-header">
                    <div class="row">
                        <div class="col-6">
                            <h3>Quang chart doughnut</h3>
                        </div>
                        <div class="col-6 text-end">
                            <a cardAction href="https://rd.quix.it/quang/components/ChartDoughnutComponent.html">Configurazioni</a>
                        </div>
                    </div>
                    </div>
                    <div class="card-body">
                        <quang-chart-doughnut
                          [id]="'test'"
                          [height]="'70vh'"
                          [chartData]="data"
                          [color]="[firstColor, secondColor, thirdColor,fourthColor, fifthColor]"
                          (chartClick)="onCLick($event)"
                        ></quang-chart-doughnut>
                    </div>
                  </div>
                </div>
              </div>
            </section>
    `,
    props: {
      ...args,
      data: data,
      firstColor: color('firstColor', '#3e885b'),
      secondColor: color('secondColor', '#debac0'),
      thirdColor: color('thirdColor', '#f3c677'),
      fourthColor: color('fourthColor', '#66c3ff'),
      fifthColor: color('fifthColor', '#dd7230'),

      onCLick (e: any): void {
        alert(`${e.type} ${e.data} ${e.seriesName}`)
      },
    }
  }
}
const Gauge: Story<BlankComponent> = (args: BlankComponent) => {
  let speed = 200
  const data: ChartGauge = new ChartGauge('velocità', speed)
  return {
    component: BlankComponent,
    template:
      `
        <section class="container-fluid">
                <div class="row mb-3">
                  <div class="col">
                    <div class="card">
                      <div class="card-header">
                      <div class="row">
                          <div class="col-6">
                              <h3>Quang chart gauge</h3>
                          </div>
                          <div class="col-6 text-end">
                              <a cardAction href="https://rd.quix.it/quang/components/ChartGaugeComponent.html">Configurazioni</a>
                          </div>
                      </div>
                      </div>
                      <div class="card-body">
                        <quang-chart-gauge
                          [id]="'test'"
                          [height]="'70vh'"
                          [chartData]="data"
                          [min]="min"
                          [max]="max"
                          [pointerColor]="pointerColor"
                          [gaugeColor]="gaugeColor"
                          [color]="color"
                          (chartClick)="onCLick($event)"
                        ></quang-chart-gauge>
                      </div>
                    </div>
                  </div>
                </div>
        </section>
    `,
    props: {
      ...args,
      data: data,
      pointerColor: color('pointerColor', '#3e885b'),
      gaugeColor: color('gaugeColor', '#fff'),
      color: color('color', '#debac0'),
      min: number('min', 0),
      max: number('max', 270),
      speed: number('speed', 200),

      onCLick (e: any): void {
        alert(`${e.type} ${e.data} ${e.seriesName}`)
      },
    }
  }
}
const Line: Story<BlankComponent> = (args: BlankComponent) => {
  const data = new ChartArea(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    [
      [820, 932, 901, 934, 1290, 1330, 1320],
      [82, 93, 90, 93, 129, 133, 132]
    ])

  return {
    component: BlankComponent,
    template:
      `
            <section class="container-fluid">
              <div class="row mb-3">
                <div class="col">
                  <div class="card">
                    <div class="card-header">
                    <div class="row">
                        <div class="col-6">
                            <h3>Quang chart line</h3>
                        </div>
                        <div class="col-6 text-end">
                            <a cardAction href="https://rd.quix.it/quang/components/ChartLineComponent.html">Configurazioni</a>
                        </div>
                    </div>
                    </div>
                    <div class="card-body">
                        <quang-chart-line
                          [id]="'test'"
                          [height]="'70vh'"
                          [chartData]="data"
                          [color]="[firstColor, secondColor]"
                          (chartClick)="onCLick($event)"
                        ></quang-chart-line>
                    </div>
                  </div>
                </div>
              </div>
            </section>
    `,
    props: {
      ...args,
      data: data,
      firstColor: color('firstColor', '#3e885b'),
      secondColor: color('secondColor', '#debac0'),
      onCLick (e: any): void {
        alert(`${e.type} ${e.data} ${e.seriesName}`)
      },
    }
  }
}
const Pie: Story<BlankComponent> = (args: BlankComponent) => {
  const data = [
    new ChartPie(335, 'uno'),
    new ChartPie(310, 'due'),
    new ChartPie(234, 'tre'),
    new ChartPie(135, 'quattro'),
    new ChartPie(1548, 'cinque')
  ]

  return {
    component: BlankComponent,
    template:
      `
            <section class="container-fluid">
              <div class="row mb-3">
                <div class="col">
                  <div class="card">
                    <div class="card-header">
                    <div class="row">
                        <div class="col-6">
                            <h3>Quang chart pie</h3>
                        </div>
                        <div class="col-6 text-end">
                            <a cardAction href="https://rd.quix.it/quang/components/ChartPieComponent.html">Configurazioni</a>
                        </div>
                    </div>
                    </div>
                    <div class="card-body">
                        <quang-chart-pie
                          [id]="'test'"
                          [height]="'70vh'"
                          [chartData]="data"
                          [color]="[firstColor, secondColor, thirdColor, fourthColor, fifthColor]"
                          (chartClick)="onCLick($event)"
                        ></quang-chart-pie>
                    </div>
                  </div>
                </div>
              </div>
      </section>
    `,
    props: {
      ...args,
      data: data,
      firstColor: color('firstColor', '#3e885b'),
      secondColor: color('secondColor', '#debac0'),
      thirdColor: color('thirdColor', '#f3c677'),
      fourthColor: color('fourthColor', '#66c3ff'),
      fifthColor: color('fifthColor', '#dd7230'),

      onCLick (e: any): void {
        alert(`${e.type} ${e.data} ${e.seriesName}`)
      },
    }
  }
}
const Radar: Story<BlankComponent> = (args: BlankComponent) => {
  const data: ChartRadar[] = [
    new ChartRadar(
      [25,33,45,68,72],
      'serie 1',
      '#debac0'
    ),
    new ChartRadar(
      [30,40,50,70,80],
      'serie 2',
      '#f3c677'
    ),
  ]
  const indicators: ChartRadarIndicator[] = [
    new ChartRadarIndicator('velocita', 100),
    new ChartRadarIndicator('precisione', 100),
    new ChartRadarIndicator('reazione', 100),
    new ChartRadarIndicator('agilità', 100),
    new ChartRadarIndicator('resistenza', 100),
  ]

  return {
    component: BlankComponent,
    template:
      `
            <section class="container-fluid">
              <div class="row mb-3">
                <div class="col">
                  <div class="card">
                    <div class="card-header">
                    <div class="row">
                        <div class="col-6">
                            <h3>Quang chart radar</h3>
                        </div>
                        <div class="col-6 text-end">
                            <a cardAction href="https://rd.quix.it/quang/components/ChartRadarComponent.html">Configurazioni</a>
                        </div>
                    </div>
                    </div>
                    <div class="card-body">
                        <quang-chart-radar
                          [id]="'test'"
                          [height]="'70vh'"
                          [radarIndicators]="indicators"
                          [chartData]="data"
                          (chartClick)="onCLick($event)"
                        ></quang-chart-radar>
                    </div>
                  </div>
                </div>
              </div>
            </section>
    `,
    props: {
      ...args,
      data: data,
      indicators: indicators,
      onCLick (e: any): void {
        alert(`${e.type} ${e.data} ${e.seriesName}`)
      },
    }
  }
}
const Tree: Story<BlankComponent> = (args: BlankComponent) => {
  const data = [
    new ChartTree('root', false, [
      new ChartTree('lv-1', true, [], 1),
      new ChartTree('lv-1', true, [], 2),
      new ChartTree('lv-1', true, [
        new ChartTree('lv-2', true, [], 1),
        new ChartTree('lv-2', true, [], 2),
        new ChartTree('lv-2', true, [], 3)
      ])
    ])
  ]

  return {
    component: BlankComponent,
    template:
      `
            <section class="container-fluid">
              <div class="row mb-3">
                <div class="col">
                  <div class="card">
                    <div class="card-header">
                    <div class="row">
                        <div class="col-6">
                            <h3>Quang chart tree</h3>
                        </div>
                        <div class="col-6 text-end">
                            <a cardAction href="https://rd.quix.it/quang/components/ChartTreeComponent.html">Configurazioni</a>
                        </div>
                    </div>
                    </div>
                    <div class="card-body">
                        <quang-chart-tree
                          [id]="'test'"
                          [height]="'70vh'"
                          [chartData]="data"
                          [nodeColor]="nodeColor"
                          [color]="color"
                          (chartClick)="onCLick($event)"
                        ></quang-chart-tree>
                    </div>
                  </div>
                </div>
              </div>
            </section>
    `,
    props: {
      ...args,
      data: data,
      nodeColor: color('firstColor', '#3e885b'),
      color: color('secondColor', '#debac0'),

      onCLick (e: any): void {
        alert(`${e.type} ${e.data} ${e.seriesName}`)
      },
    }
  }
}
const TreeMap: Story<BlankComponent> = (args: BlankComponent) => {
  const data = [
    new ChartTreemap('spazio', 10, '#3e885b'),
    new ChartTreemap('mente', 10, '#debac0'),
    new ChartTreemap('realtà', 10, '#f3c677'),
    new ChartTreemap('potere', 10, '#66c3ff'),
    new ChartTreemap('tempo', 10, '#dd7230')
  ]

  return {
    component: BlankComponent,
    template:
      `
            <section class="container-fluid">
              <div class="row mb-3">
                <div class="col">
                  <div class="card">
                    <div class="card-header">
                    <div class="row">
                        <div class="col-6">
                            <h3>Quang chart treemap</h3>
                        </div>
                        <div class="col-6 text-end">
                            <a cardAction href="https://rd.quix.it/quang/components/ChartTreeMapComponent.html">Configurazioni</a>
                        </div>
                    </div>
                    </div>
                    <div class="card-body">
                        <quang-chart-treemap
                          [id]="'test'"
                          [height]="'70vh'"
                          [chartData]="data"
                          (chartClick)="onCLick($event)"
                        ></quang-chart-treemap>
                    </div>
                  </div>
                </div>
              </div>
            </section>
    `,
    props: {
      ...args,
      data: data,

      onCLick (e: any): void {
        alert(`${e.type} ${e.data} ${e.seriesName}`)
      },
    }
  }
}

export const QuangChartArea = Area.bind({})
export const QuangChartBar = Bar.bind({})
export const QuangChartCandleStick = Candle.bind({})
export const QuangChartDoughnut = Doughnut.bind({})
export const QuangChartGauge = Gauge.bind({})
export const QuangChartLine = Line.bind({})
export const QuangChartPie = Pie.bind({})
export const QuangChartRadar= Radar.bind({})
export const QuangChartTree= Tree.bind({})
export const QuangChartTreeMap= TreeMap.bind({})
