import { Meta, Story } from '@storybook/angular/types-6-0'
import { InputTextComponent } from '../../projects/quang-core/src/lib/input-text/input-text.component'
import { TranslocoModule } from '@ngneat/transloco'
import { moduleMetadata } from '@storybook/angular'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import FormComponent from '../form.component'
import { CommonModule } from '@angular/common'

export default {
  title: 'Core/Input Text',
  component: FormComponent,
  subcomponents: { InputTextComponent },
  decorators: [
    moduleMetadata({
      imports: [
        TranslocoModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
  ],
} as Meta

const Template: Story = (args) => ({
  props: args,
})

export const InputText = Template.bind({})
