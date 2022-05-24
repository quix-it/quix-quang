import { Meta, Story } from '@storybook/angular/types-6-0'
import { moduleMetadata } from '@storybook/angular'
import { TranslocoModule } from '@ngneat/transloco'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { InputTextComponent } from '../projects/quang-core/src/lib/input-text/input-text.component'
import { BlankComponent } from './blank.component'
import { text, number, boolean, withKnobs, array, object } from '@storybook/addon-knobs'
import { InputPasswordComponent } from '../projects/quang-core/src/lib/input-password/input-password.component'
import { TextEditorComponent } from '../projects/quang-core/src/lib/text-editor/text-editor.component'
import { TextAreaComponent } from '../projects/quang-core/src/lib/text-area/text-area.component'
import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { InputTelComponent } from '../projects/quang-core/src/lib/input-tel/input-tel.component'
import { InputCheckboxComponent } from '../projects/quang-core/src/lib/input-checkbox/input-checkbox.component'
import { InputColorComponent } from '../projects/quang-core/src/lib/input-color/input-color.component'
import { QuillModule } from 'ngx-quill'
import { InputEmailComponent } from '../projects/quang-core/src/lib/input-email/input-email.component'
import { InputNumberComponent } from 'projects/quang-core/src/lib/input-number/input-number.component'
import { DatalistComponent } from '../projects/quang-core/src/lib/datalist/datalist.component'
import { InputFractionComponent } from '../projects/quang-core/src/lib/input-fraction/input-fraction.component'
import { InputRadioComponent } from '../projects/quang-core/src/lib/input-radio/input-radio.component'
import { InputFileComponent } from '../projects/quang-core/src/lib/input-file/input-file.component'
import { NgxFileDropComponent } from 'ngx-file-drop'
import { InputUrlComponent } from '../projects/quang-core/src/lib/input-url/input-url.component'
import { InputSearchComponent } from '../projects/quang-core/src/lib/input-search/input-search.component'
import { MultiSelectStrgComponent } from '../projects/quang-core/src/lib/multi-select-strg/multi-select-strg.component'

export default {
  title: 'Core',
  component: BlankComponent,
  subcomponents: {
    InputTextComponent,
    InputPasswordComponent,
    TextEditorComponent,
    TextAreaComponent,
    InputTelComponent,
    InputCheckboxComponent,
    InputEmailComponent,
    InputNumberComponent,
    InputColorComponent,
    DatalistComponent,
    InputFractionComponent,
    InputRadioComponent,
    InputFileComponent,
    InputUrlComponent,
    InputSearchComponent,
    MultiSelectStrgComponent
  },
  decorators: [withKnobs, moduleMetadata({
    declarations: [
      BlankComponent,
      CdkTextareaAutosize,
      NgxFileDropComponent,
      MultiSelectStrgComponent,
      InputTextComponent,
      InputPasswordComponent,
      TextEditorComponent,
      TextAreaComponent,
      InputTelComponent,
      InputCheckboxComponent,
      InputEmailComponent,
      InputNumberComponent,
      InputColorComponent,
      DatalistComponent,
      InputFractionComponent,
      InputRadioComponent,
      InputFileComponent,
      InputUrlComponent,
      InputSearchComponent
    ],
    imports: [TranslocoModule, ReactiveFormsModule, CommonModule, FormsModule, QuillModule]
  })]
} as Meta

const Checkbox: Story<BlankComponent> = (args: BlankComponent) => {
  const group = new FormGroup({
    checkbox: new FormControl(null, Validators.required)
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
                        <h3>Quang input Checkbox</h3>
                    </div>
                    <div class="col-6 text-end">
                        <a href="https://rd.quix.it/quang/components/InputCheckboxComponent.html" target="_blank">Configurazioni</a>
                    </div>
                </div>
              </div>
              <div class="card-body">
                <form [formGroup]="group">
                  <quang-input-checkbox
                    [label]="label"
                    [errorMessage]="errorMessage"
                    [successMessage]="successMessage"
                    [helpMessage]="helpMessage"
                    [autocomplete]="'off'"
                    [tabIndex]="1"
                    [id]="'checkbox id'"
                    [autofocus]="true"
                    [formName]="'form'"
                    formControlName="checkbox">
                  </quang-input-checkbox>
                </form>
                <dl>
                  <dt>Value:</dt>
                  <dd>{{group.controls.checkbox.value}}</dd>
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
      errorMessage: boolean('errorMessage', true),
      successMessage: boolean('successMessage', true),
      helpMessage: boolean('helpMessage', true),
      label: text('label', 'checkbox label'),
    }
  }
}
const Color: Story<BlankComponent> = (args: BlankComponent) => {
  const group = new FormGroup({
    color: new FormControl(null, [Validators.required])
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
                <h3>Quang input color</h3>
            </div>
            <div class="col-6 text-end">
                <a href="https://rd.quix.it/quang/components/InputColorComponent.html" target="_blank">Configurazioni</a>
            </div>
        </div>
        </div>
        <div class="card-body">
           <form [formGroup]="group">
            <quang-input-color
              [label]="label"
              [errorMessage]="errorMessage"
              [successMessage]="successMessage"
              [helpMessage]="helpMessage"
              [autocomplete]="'off'"
              [tabIndex]="1"
              [id]="'color id'"
              [autofocus]="true"
              [formName]="'form'"
              formControlName="color">
            </quang-input-color>
          </form>
          <dl>
            <dt>Value:</dt>
            <dd>{{group.controls.color.value}}</dd>
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
    }
  }
}
const Datalist: Story<BlankComponent> = (args: BlankComponent) => {
  const group: FormGroup = new FormGroup({
    select: new FormControl('', [Validators.required])
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
                <h3>Quang input datalist</h3>
            </div>
            <div class="col-6 text-end">
                <a cardAction href="https://rd.quix.it/quang/components/DatalistComponent.html">Configurazioni</a>
            </div>
        </div>
        </div>
        <div class="card-body">
          <form [formGroup]="group">
            <quang-datalist
              [label]="label"
              [errorMessage]="errorMessage"
              [successMessage]="successMessage"
              [helpMessage]="helpMessage"
              [tabIndex]="1"
              [id]="'test'"
              [autofocus]="true"
              [formName]="'form'"
              [list]="list"
              formControlName="select"
            ></quang-datalist>
          </form>
          <dl>
            <dt>Value:</dt>
            <dd>{{group.controls.select.value}}</dd>
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
      label: text('label', 'datalist label'),
      list: array('list',['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'])
    }
  }
}
const Fraction: Story<BlankComponent> = (args: BlankComponent) => {
  const group = new FormGroup({
    fraction: new FormControl(0, Validators.required)
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
                <h3>Quang input fraction</h3>
            </div>
        </div>
        </div>
        <div class="card-body">
          <form [formGroup]="group">
            <quang-input-fraction
              [label]="label"
              [errorMessage]="errorMessage"
              [successMessage]="successMessage"
              [helpMessage]="helpMessage"
              [autocomplete]="'off'"
              [tabIndex]="1"
              [id]="'test'"
              [autofocus]="true"
              [formName]="'form'"
              [addButtonClass]="['btn','btn-outline-success']"
              [removeButtonClass]="['btn','btn-outline-danger']"
              [stepInteger]="1"
              [stepFraction]="0.1"
              [min]="min"
              [max]="max"
              formControlName="fraction">
              <i addIntegerIcon class="fas fa-plus"></i>
              <i removeIntegerIcon class="fas fa-minus"></i>
              <i addFractionIcon class="fas fa-plus"></i>
              <i removeFractionIcon class="fas fa-minus"></i>
            </quang-input-fraction>
          </form>
          <dl>
            <dt>Value:</dt>
            <dd>{{group.controls.fraction.value}}</dd>
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
      label: text('label', 'fraction label'),
      min: number('min', 0),
      max: number('max', 255),
    }
  }
}
const Email: Story<BlankComponent> = (args: BlankComponent) => {
  const group = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(50)])
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
                <h3>Quang input email</h3>
            </div>
            <div class="col-6 text-end">
                <a href="https://rd.quix.it/quang/components/InputEmailComponent.html" target="_blank">Configurazioni</a>
            </div>
        </div>
        </div>
        <div class="card-body">
          <form [formGroup]="group">
            <quang-input-email
              [label]="label"
              [placeholder]="placeholder"
              [errorMessage]="errorMessage"
              [successMessage]="successMessage"
              [helpMessage]="helpMessage"
              [autocomplete]="'off'"
              [tabIndex]="1"
              [id]="'email id'"
              [autofocus]="true"
              [formName]="'form'"
              [min]="min"
              [max]="max"
              formControlName="email"
            ></quang-input-email>
          </form>
          <dl>
            <dt>Value:</dt>
            <dd>{{group.controls.email.value}}</dd>
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
      label: text('label', 'email label'),
      placeholder: text('placeholder', 'email placeholder'),
      min: number('min', 0),
      max: number('max', 50)
    }
  }
}
const File: Story<BlankComponent> = (args: BlankComponent) => {
  const group = new FormGroup({
    file: new FormControl(null, Validators.required)
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
                <h3>Quang input files (*only drop)</h3>
            </div>
        </div>
        </div>
        <div class="card-body">
          <form [formGroup]="group">
            <quang-input-file
              [label]="label"
              [errorMessage]="errorMessage"
              [successMessage]="successMessage"
              [helpMessage]="helpMessage"
              [tabIndex]="1"
              [id]="'file-min-max id'"
              [multiple]="true"
              [formName]="'form'"
              [buttonLabel]="'form.file.button.label'"
              [buttonClass]="['btn', 'btn-outline-secondary']"
              formControlName="file">
              <i uploadIcon class="fas fa-upload"></i>
            </quang-input-file>
          </form>
          <dl>
            <dt>Value:</dt>
            <dd>{{group.controls.file.value}}</dd>
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
      label: text('label', 'files label'),
    }
  }
}
const Number: Story<BlankComponent> = (args: BlankComponent) => {
  const group = new FormGroup({
    number: new FormControl(0, [Validators.required])
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
                <h3>Quang input number</h3>
            </div>
            <div class="col-6 text-end">
                <a href="https://rd.quix.it/quang/components/InputNumberComponent.html" target="_blank">Configurazioni</a>
            </div>
        </div>
        </div>
        <div class="card-body">
          <form [formGroup]="group">
            <quang-input-number
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
            [step]="step"
            [min]="min"
            [max]="max"
            formControlName="number"
            ></quang-input-number>
          </form>
          <dl>
            <dt>Value:</dt>
            <dd>{{group.controls.number.value}}</dd>
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
      min: number('min', 0),
      max: number('max', 50),
      step:  number('step', 1)
    }
  }
}
const Password: Story<BlankComponent> = (args: BlankComponent) => {
  const group = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
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
              [min]="min"
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
      label: text('label', 'password label'),
      placeholder: text('placeholder', 'password placeholder'),
      min: number('min', 3),
      max: number('max', 50)
    }
  }
}
const Radio: Story<BlankComponent> = (args: BlankComponent) => {
  const group = new FormGroup({
    radio: new FormControl({ value: null, disabled: true }, Validators.required)
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
                        <h3>Quang input radio</h3>
                    </div>
                    <div class="col-6 text-end">
                        <a cardAction href="https://rd.quix.it/quang/components/InputRadioComponent.html">Configurazioni</a>
                    </div>
                </div>
              </div>
              <div class="card-body">
                <form [formGroup]="group">
                  <quang-input-radio
                    [label]="label"
                    [errorMessage]="errorMessage"
                    [successMessage]="successMessage"
                    [helpMessage]="helpMessage"
                    [autocomplete]="'off'"
                    [tabIndex]="1"
                    [id]="'radio id'"
                    [autofocus]="true"
                    [radioList]="list"
                    [labelValue]="'text'"
                    [returnValue]="'value'"
                    [formName]="'form'"
                    [groupName]="'radio-group'"
                    formControlName="radio">
                  </quang-input-radio>
                </form>
                <dl>
                  <dt>Value:</dt>
                  <dd>{{group.controls.radio.value}}</dd>
                </dl>
                <button class="btn btn-outline-danger"
                  (click)="disable()">Disable</button>
                <button class="btn btn-outline-success ms-3"
                  (click)="enable()">Enable</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      `,
    props: {
      ...args,
      group: group,
      errorMessage: boolean('errorMessage', true),
      successMessage: boolean('successMessage', true),
      helpMessage: boolean('helpMessage', true),
      label: text('label', 'radio label'),
      list: object('list',[
        { value: 1, text: 'Item 1' },
        { value: 2, text: 'Item 2' },
        { value: 3, text: 'Item 3' },
        { value: 4, text: 'Item 4' },
        { value: 5, text: 'Item 5' }
      ]),
      disable (): void {
        this.group.get('radio')?.disable()
      },
      enable (): void {
        this.group.get('radio')?.enable()
      }
    }
  }
}
const Search: Story<BlankComponent> = (args: BlankComponent) => {
  const group = new FormGroup({
    search: new FormControl(null, [Validators.required, Validators.minLength(0), Validators.maxLength(50)])
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
                <h3>Quang input search</h3>
            </div>
            <div class="col-6 text-end">
                <a cardAction href="https://rd.quix.it/quang/components/InputSearchComponent.html">Configurazioni</a>
            </div>
        </div>
        </div>
        <div class="card-body">
          <form [formGroup]="group">
            <quang-input-search
              [label]="label"
              [errorMessage]="errorMessage"
              [successMessage]="successMessage"
              [helpMessage]="helpMessage"
              [autocomplete]="'off'"
              [tabIndex]="1"
              [id]="'search id'"
              [autofocus]="true"
              [min]="min"
              [max]="max"
              [formName]="'form'"
              formControlName="search">
            </quang-input-search>
          </form>
          <dl>
            <dt>Value:</dt>
            <dd>{{group.controls.search.value}}</dd>
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
      label: text('label', 'search label'),
      min: number('min', 0),
      max: number('max', 50)
    }
  }
}
const Tel: Story<BlankComponent> = (args: BlankComponent) => {
  const group = new FormGroup({
    tel: new FormControl('', [Validators.required, Validators.minLength(9)])
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
                <h3>Quang input tel</h3>
            </div>
            <div class="col-6 text-end">
                <a href="https://rd.quix.it/quang/components/InputTelComponent.html" target="_blank">Configurazioni</a>
            </div>
        </div>
        </div>
        <div class="card-body">
          <form [formGroup]="group">
            <quang-input-tel
              [label]="label"
              [placeholder]="placeholder"
              [min]="min"
              [max]="max"
              [errorMessage]="errorMessage"
              [successMessage]="successMessage"
              [helpMessage]="helpMessage"
              [autocomplete]="'off'"
              [tabIndex]="1"
              [id]="'tel id'"
              [autofocus]="true"
              [formName]="'form'"
              formControlName="tel"
            ></quang-input-tel>
          </form>
          <dl>
            <dt>Value:</dt>
            <dd>{{group.controls.tel.value}}</dd>
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
      label: text('label', 'tel label'),
      placeholder: text('placeholder', 'tel placeholder'),
      min: number('min', 9),
      max: number('max', 10)
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
const Url: Story<BlankComponent> = (args: BlankComponent) => {
  const group = new FormGroup({
    url: new FormControl(
      '',
      [Validators.required, Validators.minLength(0), Validators.maxLength(50)]
    )
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
                <h3>Quang input url</h3>
            </div>
            <div class="col-6 text-end">
                <a cardAction href="https://rd.quix.it/quang/components/InputUrlComponent.html">Configurazioni</a>
            </div>
        </div>
        </div>
        <div class="card-body">
          <form [formGroup]="group">
            <quang-input-url
              [label]="'form.url.label'"
              [placeholder]="placeholder"
              [min]="min"
              [max]="max"
              [errorMessage]="errorMessage"
              [successMessage]="successMessage"
              [helpMessage]="helpMessage"
              [autocomplete]="'off'"
              [tabIndex]="1"
              [id]="'url id'"
              [autofocus]="true"
              [formName]="'form'"
              formControlName="url"
            ></quang-input-url>
          </form>
          <dl>
            <dt>Value:</dt>
            <dd>{{group.controls.url.value}}</dd>
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
      label: text('label', 'url label'),
      placeholder: text('placeholder', 'url placeholder'),
      min: number('min', 0),
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
                <h3>Quang input text area</h3>
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
      label: text('label', 'textArea label'),
      placeholder: text('placeholder', 'textArea placeholder'),
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
      label: text('label', 'text editor label'),
      placeholder: text('placeholder', 'text editor placeholder'),
      max: number('max', 500)
    }
  }
}

export const InputCheckbox = Checkbox.bind({})
export const InputColor = Color.bind({})
export const InputDatalist = Datalist.bind({})
export const InputEmail = Email.bind({})
export const InputFile = File.bind({})
export const InputFraction = Fraction.bind({})
export const InputNumber = Number.bind({})
export const InputPassword = Password.bind({})
export const InputRadio = Radio.bind({})
export const InputSearch = Search.bind({})
export const InputTel = Tel.bind({})
export const InputText = Text.bind({})
export const InputUrl = Url.bind({})
export const TextArea = TextA.bind({})
export const TextEditor = TextEdit.bind({})
