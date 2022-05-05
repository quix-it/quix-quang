const Number: Story<BlankComponent> = (args: BlankComponent) => {
const group = new FormGroup({
number: new FormControl('', [Validators.required])
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
                <a href="https://rd.quix.it/quang/components/InputNumberComponent.html">Configurazioni</a>
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
              [min]="0"
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
      errorMessage: boolean('errorMessage', true),
      successMessage: boolean('successMessage', true),
      helpMessage: boolean('helpMessage', true),
      label: text('label', 'password label'),
      placeholder: text('placeholder', 'password placeholder'),
      step: number('step', 1),
      max: number('max', 50)
    }
  }
}
