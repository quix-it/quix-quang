import { Meta, Story } from '@storybook/angular/types-6-0'
import { moduleMetadata } from '@storybook/angular'
import { TranslocoModule } from '@ngneat/transloco'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { InputTextComponent } from '../../projects/quang-core/src/lib/input-text/input-text.component'
import { FormComponent } from '../form.component'
import { text, number, boolean, withKnobs } from '@storybook/addon-knobs'

export default {
  title: 'Input/Input Text',
  component: FormComponent,
  subcomponents: {
    InputTextComponent,
  },
  decorators: [withKnobs, moduleMetadata({
    declarations: [FormComponent, InputTextComponent],
    imports: [TranslocoModule, ReactiveFormsModule, CommonModule, FormsModule]
  })]
} as Meta

const Text: Story<FormComponent> = (args: FormComponent) => {
  const group = new FormGroup({
    text: new FormControl('', [Validators.required])
  })
  return {
    component: FormComponent,
    template:
      `
      <section class="container-fluid">
  <div class="row mb-3">
    <div class="col">
      <div class="card">
        <div class="card-header">
        <div class="row">
            <div class="col-6">
                <h3>Quang input text</h3>
            </div>
            <div class="col-6 text-end">
                <a href="https://rd.quix.it/quang/components/InputTextComponent.html">Configurazioni</a>
            </div>
        </div>
        </div>
        <div class="card-body">
          <form [formGroup]="group">
            <quang-input-text
            [label]="label"
            [placeholder]="placeholder"
            [errorMessage]="errorMessage"
            [successMessage]="successMessage"
            [helpMessage]="helpMessage"
            [autocomplete]="'off'"
            [tabIndex]="1"
            [id]="'text id'"
            [autofocus]="true"
            [formName]="'form'"
            [min]="min"
            [max]="max"
            formControlName="text"
            ></quang-input-text>
          </form>
          <dl>
            <dt>Value:</dt>
            <dd>{{group.controls.text.value}}</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</section>
      `,
    props: {
      ...args,
      group: group,
      successMessage: boolean('successMessage', true),
      errorMessage: boolean('errorMessage', true),
      helpMessage: boolean('helpMessage', true),
      label: text('label', 'text label'),
      placeholder: text('placeholder', 'text placeholder'),
      max: number('max', 50)
    }
  }
}

export const InputText = Text.bind({})
