import { Meta, Story } from '@storybook/angular/types-6-0'
import { InputTextComponent } from '../../projects/quang-core/src/lib/input-text/input-text.component'
import { TranslocoModule } from '@ngneat/transloco'
import { moduleMetadata } from '@storybook/angular'
import { FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, forwardRef } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'

export default {
  title: 'Core/Input Text',
  component: InputTextComponent,
  decorators: [
    moduleMetadata({
      declarations: [ InputTextComponent ],
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
  const group: FormGroup = new FormGroup({
    text: new FormControl(
      '',
      [Validators.required, Validators.minLength(0), Validators.maxLength(50)]
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
      <dt>
        <dl>{{form.controls.text.value}}</dl>
      </dt>
    `,
    props: {
      ...args,
      form: group,
    }
  }
}
