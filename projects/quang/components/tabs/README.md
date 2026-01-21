# QuangTabsComponent

The `QuangTabsComponent` is a flexible tabs navigation component that provides seamless tab switching, support for disabled states, custom templates, and full integration with Angular reactive forms. It supports both standard tabs and custom-rendered tabs with extensive customization options.

## Inputs

- `tabs`: `TabConfiguration[]` — Array of tab configurations. Each tab must have an `id` and `label`, and can optionally include `disabled` state or a custom `renderer`. **(Required)**
- `isReadonly`: `boolean` — Set component to read-only mode. When true, all tabs become non-interactive. Inherited from `QuangBaseComponent`
- `componentTabIndex`: `number` — Tab index for accessibility. Inherited from `QuangBaseComponent`
- `componentClass`: `string | string[]` — Additional CSS classes. Inherited from `QuangBaseComponent`
- `formControl`: `FormControl` — Form control for reactive forms. Inherited from `QuangBaseComponent`

## Outputs

- `tabChange`: `EventEmitter<string>` — Emitted when the selected tab changes. Provides the `id` of the newly selected tab
- `componentBlur`: `EventEmitter<void>` — Emitted when component loses focus. Inherited from `QuangBaseComponent`

## TabConfiguration Interface

```typescript
interface TabConfiguration {
  id: string              // Unique identifier for the tab
  label: string          // Translation key or label text
  disabled?: boolean     // If true, tab is disabled and non-interactive
  renderer?: TemplateRef<any>  // Optional custom template for tab rendering
}
```

## Usage

### Basic Tabs

```html
<quang-tabs
  [tabs]="tabs"
  [formControl]="selectedTab"
/>
```

```typescript
export class MyComponent {
  selectedTab = new FormControl<string>('home')

  tabs: TabConfiguration[] = [
    { id: 'home', label: 'navigation.home' },
    { id: 'profile', label: 'navigation.profile' },
    { id: 'settings', label: 'navigation.settings' },
  ]
}
```

### Tabs with Disabled State

```html
<quang-tabs
  [tabs]="tabs"
  [formControl]="selectedTab"
/>
```

```typescript
export class MyComponent {
  selectedTab = new FormControl<string>('tab1')

  tabs: TabConfiguration[] = [
    { id: 'tab1', label: 'Enabled Tab' },
    { id: 'tab2', label: 'Disabled Tab', disabled: true },
    { id: 'tab3', label: 'Another Tab' },
  ]
}
```

### Event Handling

```html
<quang-tabs
  [tabs]="tabs"
  [formControl]="selectedTab"
  (tabChange)="onTabChange($event)"
/>
```

```typescript
export class MyComponent {
  selectedTab = new FormControl<string>('overview')

  tabs: TabConfiguration[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'analytics', label: 'Analytics' },
  ]

  onTabChange(tabId: string): void {
    console.log('Selected tab:', tabId)
    // Handle tab change logic
  }
}
```

### Tab Content Switching

Display different content based on the selected tab using Angular's `@switch` control flow:

```html
<quang-tabs
  [tabs]="tabs"
  [formControl]="selectedTab"
/>

<!-- Content changes based on selected tab -->
<div class="mt-4">
  @switch (selectedTab.value) {
    @case ('overview') {
      <div class="card">
        <div class="card-header">
          <h5>Overview</h5>
        </div>
        <div class="card-body">
          <p>Welcome to the overview section!</p>
          <ul>
            <li>Quick statistics</li>
            <li>Recent activity</li>
          </ul>
        </div>
      </div>
    }
    @case ('details') {
      <div class="card">
        <div class="card-header">
          <h5>Details</h5>
        </div>
        <div class="card-body">
          <table class="table">
            <tbody>
              <tr>
                <td><strong>Name:</strong></td>
                <td>John Doe</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    }
    @case ('settings') {
      <div class="card">
        <div class="card-header">
          <h5>Settings</h5>
        </div>
        <div class="card-body">
          <form>
            <div class="mb-3">
              <label>Theme</label>
              <select class="form-select">
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    }
  }
</div>
```

```typescript
export class MyComponent {
  selectedTab = new FormControl<string>('overview')

  tabs: TabConfiguration[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'settings', label: 'Settings' },
  ]
}
```

### Custom Tab Templates

```html
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
        <small class="badge bg-primary">Active</small>
      }
    </span>
  </button>
</ng-template>

<quang-tabs
  [tabs]="tabs"
  [formControl]="selectedTab"
/>
```

```typescript
export class MyComponent {
  private readonly customTabTpl = viewChild<TemplateRef<any>>('customTabTpl')
  selectedTab = new FormControl<string>('dashboard')

  get tabs(): TabConfiguration[] {
    return [
      { 
        id: 'dashboard', 
        label: 'Dashboard',
        renderer: this.customTabTpl() 
      },
      { 
        id: 'messages', 
        label: 'Messages', 
        renderer: this.customTabTpl() 
      },
    ]
  }
}
```

### Form Integration with Validation

```html
<form [formGroup]="form">
  <quang-tabs
    [tabs]="tabs"
    formControlName="selectedSection"
  />
</form>
```

```typescript
export class MyComponent {

  form = this.fb.group({
    selectedSection: [null, Validators.required]
  })

  tabs: TabConfiguration[] = [
    { id: 'section1', label: 'Section 1' },
    { id: 'section2', label: 'Section 2' },
    { id: 'section3', label: 'Section 3' },
  ]
}
```

### Readonly Mode

```html
<quang-tabs
  [tabs]="tabs"
  [formControl]="selectedTab"
  [isReadonly]="isReadonly()"
/>

<button (click)="toggleReadonly()">
  Toggle Readonly
</button>
```

```typescript
export class MyComponent {
  selectedTab = new FormControl<string>('tab1')
  isReadonly = signal<boolean>(false)

  tabs: TabConfiguration[] = [
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3' },
  ]

  toggleReadonly(): void {
    this.isReadonly.set(!this.isReadonly())
  }
}
```

## Translation Integration

The component uses QuangTranslationService for all text content:

- **Automatic Translation**: All tab labels and messages are automatically translated using Transloco
- **Key Support**: Use translation keys for tab labels for multi-language support
- **Fallback Handling**: Provides graceful fallback when translations are unavailable
- **Dynamic Language**: Responds to language changes without component reload

## Custom Template Context

When using custom templates, the following context is available:

```typescript
interface QuangTabTemplateContext {
  $implicit: TabConfiguration  // The tab configuration object
  selected: boolean           // Whether this tab is currently selected
  index: number              // The index of the tab in the array
}
```

Example usage in template:

```html
<ng-template
  #tabTpl
  let-tab
  let-selected="selected"
  let-index="index"
>
  <!-- tab: TabConfiguration -->
  <!-- selected: boolean -->
  <!-- index: number -->
  <div>{{ tab.label }} - Position {{ index + 1 }}</div>
</ng-template>
```

## Styling

The component uses Bootstrap 5.3 classes for styling. The default tabs have:
- Bottom border that becomes thicker (4px) when selected
- Smooth transitions on state changes
- Disabled state with reduced opacity
- Hover effects on interactive tabs

You can customize styling using the `componentClass` input or by targeting the component's CSS classes.

## Notes

- Extends `QuangBaseComponent` for consistent behavior across all Quang components
- Supports Angular reactive forms with `ControlValueAccessor`
- Fully compatible with Angular's form validation
- Styled based on Bootstrap v5.3
- Supports both translation keys and direct text for labels
- Individual tabs can be disabled independently of the form control state
