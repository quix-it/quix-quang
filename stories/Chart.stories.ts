import { BlankComponent } from './blank.component'
import { withKnobs } from '@storybook/addon-knobs'
import { moduleMetadata } from '@storybook/angular'
import { TranslocoModule } from '@ngneat/transloco'
import { CommonModule } from '@angular/common'
import { Meta, Story } from '@storybook/angular/types-6-0'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ChartArea } from '../projects/quang-chart/src/lib/chart-area/chart-area.model'
import { ChartAreaComponent } from '../projects/quang-chart/src/lib/chart-area/chart-area.component'
import { NgxEchartsModule } from 'ngx-echarts'

export default {
  title: 'Chart',
  component: BlankComponent,
  subcomponents: {
    ChartAreaComponent,

  },
  decorators: [withKnobs, moduleMetadata({
    declarations: [
      BlankComponent,
      ChartAreaComponent,

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
                          [color]="['#3e885b', '#debac0']"
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
      onCLick (e: any): void {
        alert(`${e.type} ${e.data} ${e.seriesName}`)
      },
    }
  }
}

export const QuangChartArea = Area.bind({})
