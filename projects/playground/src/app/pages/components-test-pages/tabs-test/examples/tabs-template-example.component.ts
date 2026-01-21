import { ChangeDetectionStrategy, Component, TemplateRef, viewChild } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'

import { QuangTabsComponent, TabConfiguration } from 'quang/components/tabs'

@Component({
  selector: 'playground-tabs-template-example',
  standalone: true,
  imports: [ReactiveFormsModule, QuangTabsComponent, TranslocoPipe],
  template: `
    <ng-template
      #customTabTpl
      let-tab
      let-selected="selected"
    >
      <button
        [class.selected]="selected"
        class="flex-grow-1 btn btn-only-text custom-tab"
        type="button"
      >
        <span class="d-flex gap-2 align-items-center justify-content-center">
          <span>{{ tab.icon }}</span>
          <strong>{{ tab.label | transloco }}</strong>
          @if(selected) {
            <small class="badge bg-primary">{{ 'examples.tabs.template.active' | transloco }}</small>
          }
        </span>
      </button>
    </ng-template>

    <quang-tabs
      [tabs]="tabs"
      [formControl]="control"
      componentLabel="Tabs with custom templates"
    />
    <div class="mt-3 p-3 bg-light rounded">
      <p class="mb-0">
        <strong>{{ 'examples.tabs.template.selectedTab' | transloco }}:</strong>
        {{ control.value }}
      </p>
    </div>
  `,
  styles: `
    .custom-tab {
      border-bottom: 2px solid transparent;
      transition: all 0.2s;

      &.selected {
        border-bottom-color: var(--bs-primary);
      }

      &:hover:not(:disabled) {
        background-color: var(--bs-light);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsTemplateExampleComponent {
  private readonly customTabTpl = viewChild<TemplateRef<any>>('customTabTpl')

  control = new FormControl<string>('dashboard')

  get tabs(): TabConfiguration[] {
    return [
      { id: 'dashboard', label: 'examples.tabs.template.dashboard',  renderer: this.customTabTpl() },
      { id: 'messages', label: 'examples.tabs.template.messages',  renderer: this.customTabTpl() },
      { id: 'notifications', label: 'examples.tabs.template.notifications', renderer: this.customTabTpl() },
    ]
  }
}

// Code snippets for example viewer
export const TABS_TEMPLATE_TS = `import { Component, TemplateRef, viewChild } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { QuangTabsComponent, TabConfiguration } from 'quang/components/tabs'

@Component({
  selector: 'app-tabs-template',
  imports: [ReactiveFormsModule, QuangTabsComponent],
  template: \`
    <ng-template #customTabTpl let-tab let-selected="selected">
      <button
        [class.selected]="selected"
        class="flex-grow-1 btn btn-only-text"
      >
        <span>{{ tab.icon }} {{ tab.label }}</span>
        @if(selected) {
          <small class="badge bg-primary">Active</small>
        }
      </button>
    </ng-template>

    <quang-tabs
      [tabs]="tabs"
      [formControl]="control"
    />
  \`,
})
export class TabsTemplateComponent {
  private readonly customTabTpl = viewChild<TemplateRef<any>>('customTabTpl')
  control = new FormControl<string>('dashboard')

  get tabs(): TabConfiguration[] {
    return [
      { id: 'dashboard', label: 'Dashboard', renderer: this.customTabTpl() },
      { id: 'messages', label: 'Messages', renderer: this.customTabTpl() },
    ]
  }
}`

export const TABS_TEMPLATE_HTML = `<ng-template #customTabTpl let-tab let-selected="selected">
  <button
    [class.selected]="selected"
    class="flex-grow-1 btn btn-only-text"
  >
    <span>{{ tab.icon }} {{ tab.label }}</span>
    @if(selected) {
      <small class="badge bg-primary">Active</small>
    }
  </button>
</ng-template>

<quang-tabs
  [tabs]="tabs"
  [formControl]="control"
/>`
