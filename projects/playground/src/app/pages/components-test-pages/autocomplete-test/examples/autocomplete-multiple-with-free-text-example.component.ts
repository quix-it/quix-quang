import { JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'

import { QuangAutocompleteComponent } from 'quang/components/autocomplete'
import { SelectOption } from 'quang/components/shared'

@Component({
  selector: 'playground-autocomplete-multiple-with-free-text-example',
  standalone: true,
  imports: [ReactiveFormsModule, QuangAutocompleteComponent, JsonPipe, TranslocoPipe],
  template: `
    <div class="mb-3">
      <span class="form-label d-block">{{ 'examples.autocomplete.multiple.chipsPosition' | transloco }}</span>
      <div
        class="btn-group"
        role="group"
      >
        <button
          [class.active]="chipsPosition() === 'top'"
          (click)="chipsPosition.set('top')"
          class="btn btn-outline-primary btn-sm"
          type="button"
        >
          Top
        </button>
        <button
          [class.active]="chipsPosition() === 'bottom'"
          (click)="chipsPosition.set('bottom')"
          class="btn btn-outline-primary btn-sm"
          type="button"
        >
          Bottom
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <quang-autocomplete
          [allowFreeText]="true"
          [chipsPosition]="chipsPosition()"
          [componentLabel]="'examples.autocomplete.multiple.labelVertical' | transloco"
          [formControl]="controlVertical"
          [internalFilterOptions]="true"
          [multiple]="true"
          [selectOptions]="[]"
          multiSelectDisplayMode="vertical"
        />
        <p class="mt-2 text-muted small">
          {{ 'examples.autocomplete.multiple.selected' | transloco }}: {{ controlVertical.value | json }}
        </p>
      </div>
      <div class="col-6">
        <quang-autocomplete
          [allowFreeText]="true"
          [chipsPosition]="chipsPosition()"
          [componentLabel]="'examples.autocomplete.multiple.labelHorizontal' | transloco"
          [formControl]="controlHorizontal"
          [internalFilterOptions]="true"
          [multiple]="true"
          [selectOptions]="options()"
          multiSelectDisplayMode="horizontal"
        />
        <p class="mt-2 text-muted small">
          {{ 'examples.autocomplete.multiple.selected' | transloco }}: {{ controlHorizontal.value | json }}
        </p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteMultipleWithFreeTextExampleComponent {
  controlVertical = new FormControl<string[]>(['TypeScript', 'Flutter']) // Pre-populate with some values to demonstrate free text
  controlHorizontal = new FormControl<string[]>([])
  chipsPosition = signal<'top' | 'bottom'>('top')

  options = signal<SelectOption[]>([
    { label: 'TypeScript', value: 'typescript' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'Python', value: 'python' },
    { label: 'Java', value: 'java' },
    { label: 'C#', value: 'csharp' },
    { label: 'Go', value: 'go' },
    { label: 'Rust', value: 'rust' },
    { label: 'Ruby', value: 'ruby' },
    { label: 'PHP', value: 'php' },
    { label: 'Swift', value: 'swift' },
  ])
}

// Code snippets for example viewer
export const AUTOCOMPLETE_MULTIPLE_WITH_FREE_TEXT_TS = `import { Component, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { QuangAutocompleteComponent } from 'quang/components/autocomplete'
import { SelectOption } from 'quang/components/shared'

@Component({
  selector: 'app-autocomplete-multiple-with-free-text',
  imports: [ReactiveFormsModule, QuangAutocompleteComponent],
  templateUrl: './autocomplete-multiple-with-free-text.component.html',
})
export class AutocompleteMultipleWithFreeTextComponent {
  // Multiple selection returns an array
  control = new FormControl<string[]>([])

  options = signal<SelectOption[]>([
    { label: 'TypeScript', value: 'typescript' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'Python', value: 'python' },
    // ... more options
  ])
}`

export const AUTOCOMPLETE_MULTIPLE_WITH_FREE_TEXT_HTML = `<!-- Chips at top (default) -->
<quang-autocomplete
  [multiple]="true"
  [internalFilterOptions]="true"
  [selectOptions]="options()"
  componentLabel="Select technologies"
  chipsPosition="top"
  [formControl]="control"
/>

<!-- Chips at bottom -->
<quang-autocomplete
  [multiple]="true"
  [internalFilterOptions]="true"
  [selectOptions]="[]"
  [allowFreeText]="true"
  componentLabel="Select technologies"
  chipsPosition="bottom"
  [formControl]="control"
/>

<!-- Horizontal display mode -->
<quang-autocomplete
  [multiple]="true"
  [internalFilterOptions]="true"
  [selectOptions]="options()"
  [allowFreeText]="true"
  componentLabel="Select technologies"
  multiSelectDisplayMode="horizontal"
  [formControl]="control"
/>`
