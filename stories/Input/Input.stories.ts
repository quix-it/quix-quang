import { Meta, Story } from '@storybook/angular/types-6-0'
import { moduleMetadata } from '@storybook/angular'
import { TranslocoModule } from '@ngneat/transloco'
import { FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { InputTextComponent } from '../../projects/quang-core/src/lib/input-text/input-text.component'
import { BlankComponent } from '../blank.component'
import { text, number, boolean, withKnobs } from '@storybook/addon-knobs'
import { InputPasswordComponent } from '../../projects/quang-core/src/lib/input-password/input-password.component'
import { TextEditorComponent } from '../../projects/quang-core/src/lib/text-editor/text-editor.component'
import { TextAreaComponent } from '../../projects/quang-core/src/lib/text-area/text-area.component'
import { forwardRef } from '@angular/core'
import { CdkTextareaAutosize } from '@angular/cdk/text-field'

export default {
  title: 'Input/Components',
  component: BlankComponent,
  subcomponents: {
    InputTextComponent,
    InputPasswordComponent,
    TextEditorComponent,
    TextAreaComponent
  },
  decorators: [withKnobs, moduleMetadata({
    declarations: [BlankComponent, InputPasswordComponent, InputTextComponent, TextAreaComponent, TextEditorComponent, CdkTextareaAutosize],
    imports: [TranslocoModule, ReactiveFormsModule, CommonModule, FormsModule]
  })]
} as Meta

const Password: Story<BlankComponent> = (args: BlankComponent) => {
  const group = new FormGroup({
    password: new FormControl('', [Validators.required])
  })
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
                <h3>Quang input password</h3>
            </div>
            <div class="col-6 text-end">
                <a href="https://rd.quix.it/quang/components/InputPasswordComponent.html" target="_blank">Configurazioni</a>
            </div>
        </div>
        </div>
        <div class="card-body">
          <form [formGroup]="group">
            <quang-input-password
              [label]="label"
              [placeholder]="placeholder"
              [errorMessage]="errorMessage"
              [successMessage]="successMessage"
              [helpMessage]="helpMessage"
              [autocomplete]="'off'"
              [tabIndex]="1"
              [id]="'password id'"
              [autofocus]="true"
              [formName]="'form'"
              [buttonClass]="['btn','btn-outline-secondary']"
              [viewPassword]="viewPassword"
              [max]="max"
              formControlName="password"
            >
              <i iconHide class="fas fa-eye-slash"></i>
              <i iconView class="fas fa-eye"></i>
            </quang-input-password>
          </form>
          <dl>
            <dt>Value:</dt>
            <dd>{{group.controls.password.value}}</dd>
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
      viewPassword: boolean('viewPassword', true),
      label: text('label', 'text label'),
      placeholder: text('placeholder', 'text placeholder'),
      max: number('max', 50)
    }
  }
}
const Text: Story<BlankComponent> = (args: BlankComponent) => {
  const group = new FormGroup({
    text: new FormControl('', [Validators.required])
  })
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
                <h3>Quang input text</h3>
            </div>
            <div class="col-6 text-end">
                <a href="https://rd.quix.it/quang/components/InputTextComponent.html" target="_blank">Configurazioni</a>
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
const TextA: Story<BlankComponent> = (args: BlankComponent) => {
  const group = new FormGroup({
    textArea: new FormControl('', [Validators.required])
  })
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
                <h3>Quang input text</h3>
            </div>
            <div class="col-6 text-end">
                <a href="https://rd.quix.it/quang/components/InputTextComponent.html" target="_blank">Configurazioni</a>
            </div>
        </div>
        </div>
        <div class="card-body">
         <form [formGroup]="group">
            <quang-text-area
              [label]="label"
              [placeholder]="placeholder"
              [min]="0"
              [max]="max"
              [cols]="cols"
              [rows]="rows"
              [errorMessage]="errorMessage"
              [successMessage]="successMessage"
              [helpMessage]="helpMessage"
              [tabIndex]="1"
              [id]="'text id'"
              [autofocus]="true"
              [formName]="'form'"
              formControlName="textArea"
            ></quang-text-area>
          </form>
          <dl>
            <dt>Value:</dt>
            <dd>{{group.controls.textArea.value}}</dd>
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
      max: number('max', 50),
      cols: number('columns', 10),
      rows: number('rows', 10)
    }
  }
}
const TextEdit: Story<BlankComponent> = (args: BlankComponent) => {

  const groupBars = new FormGroup({
    textEditor: new FormControl('', [Validators.required])
  })

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
                <h3>Quang text editor</h3>
            </div>
            <div class="col-6 text-end">
                <a href="https://rd.quix.it/quang/components/TextEditorComponent.html" target="_blank">Configurazioni</a>
            </div>
        </div>
        </div>
        <div class="card-body">
          <form [formGroup]="groupBars">
            <quang-text-editor
              [label]="label"
              [placeholder]="placeholder"
              [min]="0"
              [max]="max"
              [errorMessage]="errorMessage"
              [successMessage]="successMessage"
              [helpMessage]="helpMessage"
              [tabIndex]="1"
              [id]="'textEditor-bars id'"
              [listBar]="true"
              [textTypeBar]="true"
              [textStyleBar]="true"
              [alignBar]="true"
              [fontBar]="true"
              [mediaBar]="true"
              [headerBar]="true"
              [sizeBar]="true"
              [emojiBar]="true"
              [indentBar]="true"
              [formName]="'form'"
              formControlName="textEditor"
            ></quang-text-editor>
          </form>
          <dl>
            <dt>Value:</dt>
            <dd>{{groupBars.controls.textEditor.value}}</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</section>
      `,
    props: {
      ...args,
      groupBars: groupBars,
      errorMessage: boolean('errorMessage', true),
      successMessage: boolean('successMessage', true),
      helpMessage: boolean('helpMessage', true),
      label: text('label', 'text label'),
      placeholder: text('placeholder', 'text placeholder'),
      max: number('max', 500)
    }
  }
}

export const InputPassword = Password.bind({})
export const InputText = Text.bind({})
export const TextArea = TextA.bind({})
export const TextEditor = TextEdit.bind({})
