import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'

import { QuangTabsComponent, TabConfiguration } from 'quang/components/tabs'

@Component({
  selector: 'playground-tabs-interactive-example',
  standalone: true,
  imports: [ReactiveFormsModule, QuangTabsComponent, TranslocoPipe],
  template: `
    <div class="row">
      <div class="col-md-7">
        <quang-tabs
          [formControl]="control"
          [isReadonly]="isReadonly()"
          [tabs]="tabs"
        />
        <div class="mt-3 p-3 bg-light rounded">
          <p class="mb-0">
            <strong>{{ 'examples.tabs.interactive.selectedTab' | transloco }}:</strong>
            {{ control.value ?? ('examples.tabs.interactive.none' | transloco) }}
          </p>
        </div>
      </div>
      <div class="col-md-5">
        <div class="d-flex flex-column gap-2">
          <button
            (click)="toggleDisabled()"
            class="btn btn-outline-secondary btn-sm"
            type="button"
          >
            {{ 'form.buttons.enabled' | transloco: { enabled: control.enabled } }}
          </button>
          <button
            (click)="toggleReadonly()"
            class="btn btn-outline-secondary btn-sm"
            type="button"
          >
            {{ 'form.buttons.readonly' | transloco: { readonly: isReadonly() } }}
          </button>
          <button
            (click)="resetForm()"
            class="btn btn-outline-secondary btn-sm"
            type="button"
          >
            {{ 'form.buttons.resetForm' | transloco }}
          </button>
          <button
            (click)="markAsTouched()"
            class="btn btn-outline-secondary btn-sm"
            type="button"
          >
            {{ 'examples.tabs.interactive.markAsTouched' | transloco }}
          </button>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsInteractiveExampleComponent {
  control = new FormControl<string | null>(null, [Validators.required])
  isReadonly = signal<boolean>(false)

  tabs: TabConfiguration[] = [
    { id: 'tab1', label: 'examples.tabs.interactive.tab1' },
    { id: 'tab2', label: 'examples.tabs.interactive.tab2' },
    { id: 'tab3', label: 'examples.tabs.interactive.tab3' },
  ]

  toggleDisabled(): void {
    if (this.control.enabled) this.control.disable()
    else this.control.enable()
  }

  toggleReadonly(): void {
    this.isReadonly.set(!this.isReadonly())
  }

  resetForm(): void {
    this.control.reset()
  }

  markAsTouched(): void {
    this.control.markAsTouched()
  }
}

// Code snippets for example viewer
export const TABS_INTERACTIVE_TS = `import { Component, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { QuangTabsComponent, TabConfiguration } from 'quang/components/tabs'

@Component({
  selector: 'app-tabs-interactive',
  imports: [ReactiveFormsModule, QuangTabsComponent],
  template: \`
    <quang-tabs
      [tabs]="tabs"
      [formControl]="control"
      [isReadonly]="isReadonly()"
    />
    <button (click)="toggleDisabled()">Toggle Disabled</button>
    <button (click)="toggleReadonly()">Toggle Readonly</button>
  \`,
})
export class TabsInteractiveComponent {
  control = new FormControl<string | null>(null, [Validators.required])
  isReadonly = signal<boolean>(false)

  tabs: TabConfiguration[] = [
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3' },
  ]

  toggleDisabled(): void {
    this.control.enabled ? this.control.disable() : this.control.enable()
  }

  toggleReadonly(): void {
    this.isReadonly.set(!this.isReadonly())
  }
}`

export const TABS_INTERACTIVE_HTML = `<quang-tabs
  [tabs]="tabs"
  [formControl]="control"
  [isReadonly]="isReadonly()"
/>`
