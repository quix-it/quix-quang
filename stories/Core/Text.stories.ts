import { Meta, Story } from '@storybook/angular/types-6-0'
import { InputTextComponent } from '../../projects/quang-core/src/lib/input-text/input-text.component'
import { TranslocoModule } from '@ngneat/transloco'
import { moduleMetadata } from '@storybook/angular'
import { SimpleChanges } from '@angular/core'
import { delay, filter } from 'rxjs/operators'

export default {
  title: 'Core/Input Text',
  component: InputTextComponent,
  decorators: [
    moduleMetadata({
      imports: [TranslocoModule]
    })
  ]
} as Meta

const Template: Story = (args) => ({
  props: args
})

export const InputText = Template.bind({})
InputText.args = {
  _value: '',
  value: '',
  max: 50,
  label: 'form.input.text',
  formName: 'Form',
  autofocus: true,
}
