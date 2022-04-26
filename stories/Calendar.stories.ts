import { Meta, Story } from '@storybook/angular/types-6-0'
import { CalendarComponent } from 'echarts/components'
import { TranslocoModule } from '@ngneat/transloco'
import { moduleMetadata } from '@storybook/angular'
import { HttpClientModule } from '@angular/common/http'

export default {
  title: 'Calendar/Calendar',
  component: CalendarComponent,
  decorators: [
    moduleMetadata({
      imports: [TranslocoModule, HttpClientModule]
    })
  ]
} as Meta

const Template: Story = () => ({})

export const Calendar = Template.bind({})
