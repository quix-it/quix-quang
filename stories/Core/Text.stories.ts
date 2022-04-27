import { Meta, Story } from '@storybook/angular/types-6-0'
import { InputTextComponent } from '../../projects/quang-core/src/lib/input-text/input-text.component'
import { TranslocoModule } from '@ngneat/transloco'
import { moduleMetadata } from '@storybook/angular'
import { FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, forwardRef } from '@angular/core'

export default {
  title: 'Core/Input Text',
  component: InputTextComponent,
  decorators: [
    moduleMetadata({
      imports: [
        TranslocoModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      ]
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
} as Meta

export const InputText: Story = (args) => {
  const formGroup = new FormGroup({
    text: new FormControl(
      '',
      [Validators.required]
    )
  })

  return {
    component: InputTextComponent,
    template: `
      <form [formGroup]="form">
        <quang-input-text
            [label]="'form.text.label'"
            [placeholder]="'form.text.ph'"
            [errorMessage]="true"
            [successMessage]="true"
            [helpMessage]="true"
            [autocomplete]="'off'"
            [tabIndex]="1"
            [id]="'text id'"
            [autofocus]="true"
            [formName]="'form'"
            [min]="0"
            [max]="50"
            formControlName="text"
            ></quang-input-text>
      </form>
      <div>{{_value}}</div>
    `,
    props: {
      ...args,
      form: formGroup,
      value: ''
    }
  }
}
