import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'

import { QuangTabsComponent, TabConfiguration } from 'quang/components/tabs'

@Component({
  selector: 'playground-tabs-content-example',
  standalone: true,
  imports: [ReactiveFormsModule, QuangTabsComponent, TranslocoPipe],
  template: `
    <quang-tabs
      [formControl]="selectedTab"
      [tabs]="tabs"
    />

    <!-- Content based on selected tab -->
    <div class="mt-4">
      @switch (selectedTab.value) {
        @case ('overview') {
          <div class="card">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0">{{ 'examples.tabs.content.overview.title' | transloco }}</h5>
            </div>
            <div class="card-body">
              <p>{{ 'examples.tabs.content.overview.description' | transloco }}</p>
              <ul>
                <li>{{ 'examples.tabs.content.overview.point1' | transloco }}</li>
                <li>{{ 'examples.tabs.content.overview.point2' | transloco }}</li>
                <li>{{ 'examples.tabs.content.overview.point3' | transloco }}</li>
              </ul>
            </div>
          </div>
        }
        @case ('details') {
          <div class="card">
            <div class="card-header bg-success text-white">
              <h5 class="mb-0">{{ 'examples.tabs.content.details.title' | transloco }}</h5>
            </div>
            <div class="card-body">
              <p>{{ 'examples.tabs.content.details.description' | transloco }}</p>
              <table class="table table-striped">
                <tbody>
                  <tr>
                    <td>
                      <strong>{{ 'examples.tabs.content.details.field1' | transloco }}</strong>
                    </td>
                    <td>{{ 'examples.tabs.content.details.value1' | transloco }}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>{{ 'examples.tabs.content.details.field2' | transloco }}</strong>
                    </td>
                    <td>{{ 'examples.tabs.content.details.value2' | transloco }}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>{{ 'examples.tabs.content.details.field3' | transloco }}</strong>
                    </td>
                    <td>{{ 'examples.tabs.content.details.value3' | transloco }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        }
        @case ('settings') {
          <div class="card">
            <div class="card-header bg-warning">
              <h5 class="mb-0">{{ 'examples.tabs.content.settings.title' | transloco }}</h5>
            </div>
            <div class="card-body">
              <p>{{ 'examples.tabs.content.settings.description' | transloco }}</p>
              <form>
                <div class="mb-3">
                  <label
                    class="form-label"
                    for="option1Select"
                    >{{ 'examples.tabs.content.settings.option1' | transloco }}</label
                  >
                  <select
                    class="form-select"
                    id="option1Select"
                  >
                    <option>{{ 'examples.tabs.content.settings.choice1' | transloco }}</option>
                    <option>{{ 'examples.tabs.content.settings.choice2' | transloco }}</option>
                    <option>{{ 'examples.tabs.content.settings.choice3' | transloco }}</option>
                  </select>
                </div>
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    id="notificationsCheck"
                    type="checkbox"
                  />
                  <label
                    class="form-check-label"
                    for="notificationsCheck"
                  >
                    {{ 'examples.tabs.content.settings.enableNotifications' | transloco }}
                  </label>
                </div>
                <button
                  class="btn btn-primary"
                  type="submit"
                >
                  {{ 'examples.tabs.content.settings.save' | transloco }}
                </button>
              </form>
            </div>
          </div>
        }
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsContentExampleComponent {
  selectedTab = new FormControl<string>('overview')

  tabs: TabConfiguration[] = [
    { id: 'overview', label: 'examples.tabs.content.tabOverview' },
    { id: 'details', label: 'examples.tabs.content.tabDetails' },
    { id: 'settings', label: 'examples.tabs.content.tabSettings' },
  ]
}

// Code snippets for example viewer
export const TABS_CONTENT_TS = `import { Component } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { QuangTabsComponent, TabConfiguration } from 'quang/components/tabs'

@Component({
  selector: 'app-tabs-content',
  imports: [ReactiveFormsModule, QuangTabsComponent],
  template: \`
    <quang-tabs
      [tabs]="tabs"
      [formControl]="selectedTab"
    />

    <!-- Content changes based on selected tab -->
    <div class="mt-4">
      @switch (selectedTab.value) {
        @case ('overview') {
          <div class="card">
            <div class="card-header bg-primary text-white">
              <h5>Overview</h5>
            </div>
            <div class="card-body">
              <p>Welcome to the overview section!</p>
              <ul>
                <li>Quick statistics</li>
                <li>Recent activity</li>
                <li>Summary information</li>
              </ul>
            </div>
          </div>
        }
        @case ('details') {
          <div class="card">
            <div class="card-header bg-success text-white">
              <h5>Details</h5>
            </div>
            <div class="card-body">
              <table class="table">
                <tbody>
                  <tr>
                    <td><strong>Name:</strong></td>
                    <td>John Doe</td>
                  </tr>
                  <tr>
                    <td><strong>Email:</strong></td>
                    <td>john.doe@example.com</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        }
        @case ('settings') {
          <div class="card">
            <div class="card-header bg-warning">
              <h5>Settings</h5>
            </div>
            <div class="card-body">
              <form>
                <div class="mb-3">
                  <label class="form-label">Theme</label>
                  <select class="form-select">
                    <option>Light</option>
                    <option>Dark</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary">
                  Save Settings
                </button>
              </form>
            </div>
          </div>
        }
      }
    </div>
  \`,
})
export class TabsContentComponent {
  selectedTab = new FormControl<string>('overview')

  tabs: TabConfiguration[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'settings', label: 'Settings' },
  ]
}`

export const TABS_CONTENT_HTML = `<quang-tabs
  [tabs]="tabs"
  [formControl]="selectedTab"
/>

<!-- Content changes based on selected tab -->
<div class="mt-4">
  @switch (selectedTab.value) {
    @case ('overview') {
      <div class="card">
        <!-- Overview content -->
      </div>
    }
    @case ('details') {
      <div class="card">
        <!-- Details content -->
      </div>
    }
    @case ('settings') {
      <div class="card">
        <!-- Settings content -->
      </div>
    }
  }
</div>`
