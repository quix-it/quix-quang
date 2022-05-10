import { BlankComponent } from './blank.component'
import { color, withKnobs } from '@storybook/addon-knobs'
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
import { ChartCandlestickComponent } from '../projects/quang-chart/src/lib/chart-candlestick/chart-candlestick.component'
import { ChartCandlestick } from '../projects/quang-chart/src/lib/chart-candlestick/chart-candlestick.model'
export default {
  title: 'Chart',
  component: BlankComponent,
  subcomponents: {
    ChartAreaComponent,
    ChartBarComponent,
    ChartCandlestickComponent
  },
  decorators: [withKnobs, moduleMetadata({
    declarations: [
      BlankComponent,
      ChartAreaComponent,
      ChartBarComponent,
      ChartCandlestickComponent
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
                          [height]="'50vh'"
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
                          [height]="'50vh'"
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
                          [height]="'50vh'"
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

export const QuangChartArea = Area.bind({})
export const QuangChartBar = Bar.bind({})
export const QuangChartCandleStick = Candle.bind({})
