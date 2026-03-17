import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { QuangTabsComponent, TabConfiguration, TabsOrientation } from 'quang/components/tabs'

@Component({
  selector: 'playground-tabs-content-orientation-example',
  standalone: true,
  imports: [ReactiveFormsModule, QuangTabsComponent],
  template: `
    <div class="form-check form-switch mb-3">
      <input
        [checked]="verticalOrientationEnabled()"
        (change)="toggleOrientation()"
        class="form-check-input"
        id="verticalOrientationToggle"
        type="checkbox"
      />
      <label
        class="form-check-label"
        for="verticalOrientationToggle"
      >
        Vertical alignment
      </label>
    </div>

    <quang-tabs
      [formControl]="selectedTab"
      [tabs]="tabs"
      [tabsOrientation]="tabsOrientation()"
    />

    <div class="mt-4">
      @switch (selectedTab.value) {
        @case ('overview') {
          <div class="card">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0">Overview</h5>
            </div>
            <div class="card-body">
              <p>Welcome to the overview section.</p>
            </div>
          </div>
        }
        @case ('details') {
          <div class="card">
            <div class="card-header bg-success text-white">
              <h5 class="mb-0">Details</h5>
            </div>
            <div class="card-body">
              <p>Here are additional details for the selected tab.</p>
            </div>
          </div>
        }
        @case ('settings') {
          <div class="card">
            <div class="card-header bg-warning">
              <h5 class="mb-0">Settings</h5>
            </div>
            <div class="card-body">
              <p>Configure tab-related settings here.</p>
            </div>
          </div>
        }
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsContentOrientationExampleComponent {
  selectedTab = new FormControl<string>('overview')

  verticalOrientationEnabled = signal<boolean>(false)

  tabsOrientation = computed(() =>
    this.verticalOrientationEnabled() ? TabsOrientation.Vertical : TabsOrientation.Horizontal
  )

  tabs: TabConfiguration[] = [
    { id: 'overview', label: 'examples.tabs.content.tabOverview' },
    { id: 'details', label: 'examples.tabs.content.tabDetails' },
    { id: 'settings', label: 'examples.tabs.content.tabSettings' },
  ]

  toggleOrientation(): void {
    this.verticalOrientationEnabled.set(!this.verticalOrientationEnabled())
  }
}

export const TABS_CONTENT_ORIENTATION_TS = `import { Component, computed, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { QuangTabsComponent, TabConfiguration, TabsOrientation } from 'quang/components/tabs'

@Component({
  selector: 'app-tabs-content-orientation',
  imports: [ReactiveFormsModule, QuangTabsComponent],
  template: \`
    <div class="form-check form-switch mb-3">
      <input
        class="form-check-input"
        id="verticalOrientationToggle"
        type="checkbox"
        [checked]="verticalOrientationEnabled()"
        (change)="toggleOrientation()"
      />
      <label
        class="form-check-label"
        for="verticalOrientationToggle"
      >
        Vertical alignment
      </label>
    </div>

    <quang-tabs
      [formControl]="selectedTab"
      [tabs]="tabs"
      [tabsOrientation]="tabsOrientation()"
    />
  \`,
})
export class TabsContentOrientationComponent {
  selectedTab = new FormControl<string>('overview')

  verticalOrientationEnabled = signal<boolean>(false)

  tabsOrientation = computed(() =>
    this.verticalOrientationEnabled() ? TabsOrientation.Vertical : TabsOrientation.Horizontal
  )

  tabs: TabConfiguration[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'settings', label: 'Settings' },
  ]

  toggleOrientation(): void {
    this.verticalOrientationEnabled.set(!this.verticalOrientationEnabled())
  }
}`

export const TABS_CONTENT_ORIENTATION_HTML = `<div class="form-check form-switch mb-3">
  <input
    class="form-check-input"
    id="verticalOrientationToggle"
    type="checkbox"
    [checked]="verticalOrientationEnabled()"
    (change)="toggleOrientation()"
  />
  <label
    class="form-check-label"
    for="verticalOrientationToggle"
  >
    Vertical alignment
  </label>
</div>

<quang-tabs
  [formControl]="selectedTab"
  [tabs]="tabs"
  [tabsOrientation]="tabsOrientation()"
/>`
