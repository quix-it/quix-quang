import { JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'

import { QuangAutocompleteComponent } from 'quang/components/autocomplete'
import { SelectOption } from 'quang/components/shared'

@Component({
  selector: 'playground-autocomplete-interactive-example',
  standalone: true,
  imports: [JsonPipe, FormsModule, ReactiveFormsModule, QuangAutocompleteComponent, TranslocoPipe],
  template: `
    <div class="interactive-example">
      <!-- Options Panel -->
      <div class="options-panel">
        <h6 class="options-title">{{ 'examples.autocomplete.interactive.optionsTitle' | transloco }}</h6>

        <div class="options-grid">
          <!-- Behavior Options -->
          <div class="option-group">
            <span class="option-group-title">{{ 'examples.autocomplete.interactive.behavior' | transloco }}</span>

            <label class="option-item">
              <input
                [checked]="internalFilterOptions()"
                (change)="internalFilterOptions.set(!internalFilterOptions())"
                type="checkbox"
              />
              <span>internalFilterOptions</span>
            </label>

            <label class="option-item">
              <input
                [checked]="autoSelectOnExactMatch()"
                (change)="autoSelectOnExactMatch.set(!autoSelectOnExactMatch())"
                type="checkbox"
              />
              <span>autoSelectOnExactMatch</span>
            </label>

            <label class="option-item">
              <input
                [checked]="updateValueOnType()"
                (change)="updateValueOnType.set(!updateValueOnType())"
                type="checkbox"
              />
              <span>updateValueOnType</span>
            </label>

            <label class="option-item">
              <input
                [checked]="allowFreeText()"
                (change)="allowFreeText.set(!allowFreeText())"
                type="checkbox"
              />
              <span>allowFreeText</span>
            </label>

            <label class="option-item">
              <input
                [checked]="syncFormWithText()"
                (change)="syncFormWithText.set(!syncFormWithText())"
                type="checkbox"
              />
              <span>syncFormWithText</span>
            </label>

            <label class="option-item">
              <input
                [checked]="trim()"
                (change)="trim.set(!trim())"
                type="checkbox"
              />
              <span>trim</span>
            </label>
          </div>

          <!-- State Options -->
          <div class="option-group">
            <span class="option-group-title">{{ 'examples.autocomplete.interactive.state' | transloco }}</span>

            <label class="option-item">
              <input
                [checked]="isDisabled()"
                (change)="toggleDisabled()"
                type="checkbox"
              />
              <span>disabled</span>
            </label>

            <label class="option-item">
              <input
                [checked]="isReadonly()"
                (change)="isReadonly.set(!isReadonly())"
                type="checkbox"
              />
              <span>readonly</span>
            </label>

            <label class="option-item">
              <input
                [checked]="multiple()"
                (change)="toggleMultiple()"
                type="checkbox"
              />
              <span>multiple</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Options Editor Panel -->
      <div class="options-editor-panel">
        <div class="options-editor-header">
          <h6 class="options-title">{{ 'examples.autocomplete.interactive.selectOptionsTitle' | transloco }}</h6>
          <button
            (click)="addOption()"
            class="btn-add"
            type="button"
          >
            + {{ 'examples.autocomplete.interactive.addOption' | transloco }}
          </button>
        </div>

        <div class="options-list">
          @for (option of options(); track option.value; let i = $index) {
            <div class="option-row">
              <input
                [ngModel]="option.label"
                (ngModelChange)="updateOptionLabel(i, $event)"
                class="option-input"
                placeholder="Label"
                type="text"
              />
              <input
                [ngModel]="option.value"
                (ngModelChange)="updateOptionValue(i, $event)"
                class="option-input option-value"
                placeholder="Value"
                type="text"
              />
              <button
                (click)="deleteOption(i)"
                class="btn-delete"
                title="Delete"
                type="button"
              >
                ×
              </button>
            </div>
          } @empty {
            <p class="no-options">{{ 'examples.autocomplete.interactive.noOptions' | transloco }}</p>
          }
        </div>
      </div>

      <!-- Autocomplete Component -->
      <div class="component-preview">
        <quang-autocomplete
          [allowFreeText]="allowFreeText()"
          [autoSelectOnExactMatch]="autoSelectOnExactMatch()"
          [componentLabel]="'examples.autocomplete.interactive.label' | transloco"
          [formControl]="control"
          [internalFilterOptions]="internalFilterOptions()"
          [isReadonly]="isReadonly()"
          [multiple]="multiple()"
          [selectOptions]="options()"
          [syncFormWithText]="syncFormWithText()"
          [trim]="trim()"
          [updateValueOnType]="updateValueOnType()"
        />
      </div>

      <!-- Current Value Display -->
      <div class="value-display">
        <span class="value-label">{{ 'examples.autocomplete.interactive.currentValue' | transloco }}:</span>
        <code class="value-code">{{ control.value | json }}</code>
      </div>
    </div>
  `,
  styles: [
    `
      .interactive-example {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .options-panel,
      .options-editor-panel {
        background: var(--bs-light, #f8f9fa);
        border-radius: 8px;
        padding: 1rem;
      }

      .options-title {
        margin: 0 0 0.75rem 0;
        font-weight: 600;
        color: var(--bs-secondary, #6c757d);
        text-transform: uppercase;
        font-size: 0.75rem;
        letter-spacing: 0.5px;
      }

      .options-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
      }

      .option-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .option-group-title {
        font-weight: 500;
        font-size: 0.875rem;
        color: var(--bs-body-color, #212529);
        margin-bottom: 0.25rem;
      }

      .option-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        font-size: 0.875rem;
        font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
      }

      .option-item input[type='checkbox'] {
        width: 1rem;
        height: 1rem;
        cursor: pointer;
      }

      .options-editor-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.75rem;
      }

      .options-editor-header .options-title {
        margin: 0;
      }

      .btn-add {
        background: var(--bs-primary, #0d6efd);
        color: white;
        border: none;
        border-radius: 4px;
        padding: 0.25rem 0.75rem;
        font-size: 0.8125rem;
        cursor: pointer;
        transition: background 0.2s;
      }

      .btn-add:hover {
        background: var(--bs-primary-dark, #0b5ed7);
      }

      .options-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        max-height: 200px;
        overflow-y: auto;
      }

      .option-row {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }

      .option-input {
        flex: 1;
        padding: 0.375rem 0.5rem;
        border: 1px solid var(--bs-border-color, #dee2e6);
        border-radius: 4px;
        font-size: 0.875rem;
        background: var(--bs-white, #fff);
      }

      .option-input:focus {
        outline: none;
        border-color: var(--bs-primary, #0d6efd);
        box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.15);
      }

      .option-value {
        max-width: 100px;
        font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
      }

      .btn-delete {
        background: var(--bs-danger, #dc3545);
        color: white;
        border: none;
        border-radius: 4px;
        width: 1.75rem;
        height: 1.75rem;
        font-size: 1rem;
        line-height: 1;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s;
      }

      .btn-delete:hover {
        background: var(--bs-danger-dark, #bb2d3b);
      }

      .no-options {
        color: var(--bs-secondary, #6c757d);
        font-style: italic;
        margin: 0;
        padding: 0.5rem;
        text-align: center;
      }

      .component-preview {
        padding: 1rem;
        border: 1px dashed var(--bs-border-color, #dee2e6);
        border-radius: 8px;
      }

      .value-display {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem;
        background: var(--bs-light, #f8f9fa);
        border-radius: 4px;
        font-size: 0.875rem;
      }

      .value-label {
        color: var(--bs-secondary, #6c757d);
      }

      .value-code {
        background: var(--bs-white, #fff);
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.8125rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteInteractiveExampleComponent {
  // Form control - use 'any' to support both single and multiple mode
  control = new FormControl<string | string[] | null>(null)

  // Behavior options
  internalFilterOptions = signal(true)
  autoSelectOnExactMatch = signal(true)
  updateValueOnType = signal(false)
  allowFreeText = signal(false)
  syncFormWithText = signal(false)
  trim = signal(false)

  // State options
  isDisabled = signal(false)
  isReadonly = signal(false)
  multiple = signal(false)

  // Options list
  options = signal<SelectOption[]>([
    { label: 'Italy', value: 'IT' },
    { label: 'France', value: 'FR' },
    { label: 'Germany', value: 'DE' },
    { label: 'Spain', value: 'ES' },
    { label: 'Portugal', value: 'PT' },
    { label: 'United Kingdom', value: 'UK' },
    { label: 'Netherlands', value: 'NL' },
    { label: 'Belgium', value: 'BE' },
    { label: 'Austria', value: 'AT' },
    { label: 'Switzerland', value: 'CH' },
  ])

  toggleDisabled(): void {
    if (this.control.disabled) {
      this.control.enable()
      this.isDisabled.set(false)
    } else {
      this.control.disable()
      this.isDisabled.set(true)
    }
  }

  toggleMultiple(): void {
    this.multiple.set(!this.multiple())
    // Reset the control value when switching between single and multiple mode
    this.control.reset()
  }

  addOption(): void {
    const newIndex = this.options().length + 1
    this.options.update((opts) => [...opts, { label: `Option ${newIndex}`, value: `opt${newIndex}` }])
  }

  updateOptionLabel(index: number, label: string): void {
    this.options.update((opts) => {
      const updated = [...opts]
      updated[index] = { ...updated[index], label }
      return updated
    })
  }

  updateOptionValue(index: number, value: string): void {
    this.options.update((opts) => {
      const updated = [...opts]
      updated[index] = { ...updated[index], value }
      return updated
    })
  }

  deleteOption(index: number): void {
    this.options.update((opts) => opts.filter((_, i) => i !== index))
    // Reset the control if the deleted option was selected
    this.control.reset()
  }
}

// Code snippets for example viewer
export const AUTOCOMPLETE_INTERACTIVE_TS = `import { Component, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { QuangAutocompleteComponent } from 'quang/components/autocomplete'
import { SelectOption } from 'quang/components/shared'

@Component({
  selector: 'app-autocomplete-interactive',
  imports: [ReactiveFormsModule, QuangAutocompleteComponent],
  template: \`
    <quang-autocomplete
      [internalFilterOptions]="internalFilterOptions()"
      [autoSelectOnExactMatch]="autoSelectOnExactMatch()"
      [updateValueOnType]="updateValueOnType()"
      [allowFreeText]="allowFreeText()"
      [syncFormWithText]="syncFormWithText()"
      [trim]="trim()"
      [isReadonly]="isReadonly()"
      [multiple]="multiple()"
      [selectOptions]="options()"
      componentLabel="Select a country"
      [formControl]="control"
    />
  \`,
})
export class AutocompleteInteractiveComponent {
  control = new FormControl<string | null>(null)

  // Toggle these options to see different behaviors
  internalFilterOptions = signal(true)
  autoSelectOnExactMatch = signal(true)  // Auto-select on exact label match
  updateValueOnType = signal(false)       // Update form value while typing
  allowFreeText = signal(false)           // Allow custom text as value
  syncFormWithText = signal(false)        // Sync form with typed text
  trim = signal(false)                    // Trim whitespace on blur
  isReadonly = signal(false)
  multiple = signal(false)

  options = signal<SelectOption[]>([
    { label: 'Italy', value: 'IT' },
    { label: 'France', value: 'FR' },
    { label: 'Germany', value: 'DE' },
  ])
}`

export const AUTOCOMPLETE_INTERACTIVE_HTML = `<quang-autocomplete
  [internalFilterOptions]="internalFilterOptions()"
  [autoSelectOnExactMatch]="autoSelectOnExactMatch()"
  [updateValueOnType]="updateValueOnType()"
  [allowFreeText]="allowFreeText()"
  [syncFormWithText]="syncFormWithText()"
  [trim]="trim()"
  [isReadonly]="isReadonly()"
  [multiple]="multiple()"
  [selectOptions]="options()"
  componentLabel="Select a country"
  [formControl]="control"
/>`
