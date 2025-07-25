# QuangCheckboxComponent

The `QuangCheckboxComponent` is a versatile checkbox and toggle switch component that provides flexible label positioning, comprehensive validation feedback, and seamless integration with Angular forms. It supports both traditional checkbox and modern toggle switch modes with extensive customization options.

## Supported Features

### Input Types
- **Standard Checkbox**: Traditional checkbox with checkmark indication
- **Toggle Switch**: Modern switch-style toggle with sliding animation
- **Configurable Styling**: Adapts appearance based on selected type
- **State Management**: Handles checked/unchecked states with form integration

### Label Positioning
- **Top Positioning**: Label above the checkbox/toggle (default)
- **Bottom Positioning**: Label below the checkbox/toggle
- **Left Positioning**: Label to the left of the input
- **Right Positioning**: Label to the right of the input
- **Flexible Layout**: Responsive positioning with proper alignment

### Form Integration
- **Reactive Forms**: Full Angular reactive forms support
- **Template-driven Forms**: Compatible with template-driven forms
- **Validation Display**: Visual feedback for validation states
- **State Synchronization**: Automatic value synchronization with form controls

### Accessibility Features
- **Keyboard Navigation**: Full keyboard support with space/enter activation
- **Screen Reader Support**: Proper ARIA attributes and role definitions
- **Focus Management**: Clear focus indicators and logical tab order
- **Label Association**: Proper label-input association for accessibility

### Internationalization
- **Translation Support**: Integrated with QuangTranslationService
- **Localized Messages**: Translatable labels, help text, and validation messages
- **RTL Support**: Compatible with right-to-left languages

## Inputs

- `checkType`: `'checkbox' | 'toggle'` — Specifies the input type. Checkbox renders as traditional checkmark input, toggle renders as modern switch control. **(Required)**
- `labelPosition`: `'top' | 'left' | 'right' | 'bottom'` — Position of the label relative to the input control. Affects layout direction and spacing. Default: `'top'`
- `removeMargin`: `boolean` — Removes default bottom margin and form-check class. Useful for custom layouts or tight spacing requirements. Default: `false`
All standard inputs inherited from `QuangBaseComponent`: `isReadonly`, `componentLabel`, `componentPlaceholder`, `componentTabIndex`, `componentClass`, `errorMap`, `successMessage`, `helpMessage`, `formControl`

## Outputs

- `changedHandler`: `EventEmitter<boolean>` — Emitted when checkbox state changes. Provides the new boolean value (true for checked, false for unchecked)
All standard outputs inherited from `QuangBaseComponent`: `componentBlur`

## Usage

### Basic Checkbox
```html
<quang-checkbox
  checkType="checkbox"
  [errorMap]="errors()"
  componentLabel="form.label.agreeToTerms"
  formControlName="agreeToTerms"
>
</quang-checkbox>
```

### Toggle Switch
```html
<quang-checkbox
  checkType="toggle"
  [errorMap]="errors()"
  componentLabel="form.label.enableNotifications"
  labelPosition="left"
  formControlName="notifications"
  successMessage="Settings saved successfully"
>
</quang-checkbox>
```

### Different Label Positions
```html
<!-- Label on top (default) -->
<quang-checkbox
  checkType="checkbox"
  componentLabel="form.label.topLabel"
  labelPosition="top"
  formControlName="topOption"
>
</quang-checkbox>

<!-- Label on bottom -->
<quang-checkbox
  checkType="checkbox"
  componentLabel="form.label.bottomLabel"
  labelPosition="bottom"
  formControlName="bottomOption"
>
</quang-checkbox>

<!-- Label on left -->
<quang-checkbox
  checkType="toggle"
  componentLabel="form.label.leftLabel"
  labelPosition="left"
  formControlName="leftOption"
>
</quang-checkbox>

<!-- Label on right -->
<quang-checkbox
  checkType="toggle"
  componentLabel="form.label.rightLabel"
  labelPosition="right"
  formControlName="rightOption"
>
</quang-checkbox>
```

### Validation and Help Text
```html
<quang-checkbox
  checkType="checkbox"
  [errorMap]="errors()"
  componentLabel="form.label.requiredConsent"
  helpMessage="form.help.consentExplanation"
  successMessage="form.success.consentGiven"
  formControlName="consent"
>
</quang-checkbox>
```

### Readonly Mode
```html
<quang-checkbox
  checkType="toggle"
  [isReadonly]="true"
  componentLabel="form.label.readonlyStatus"
  labelPosition="left"
  formControlName="status"
>
</quang-checkbox>
```

### Custom Layout Without Default Margins
```html
<div class="custom-checkbox-container">
  <quang-checkbox
    checkType="checkbox"
    [removeMargin]="true"
    componentLabel="form.label.customLayout"
    componentClass="custom-checkbox"
    formControlName="customOption"
  >
  </quang-checkbox>
</div>
```

### Event Handling
```html
<quang-checkbox
  checkType="toggle"
  componentLabel="form.label.dynamicToggle"
  (changedHandler)="onToggleChange($event)"
  formControlName="dynamicOption"
>
</quang-checkbox>
```

#### TypeScript Event Handling
```typescript
onToggleChange(isChecked: boolean): void {
  console.log('Toggle state changed:', isChecked);
  
  if (isChecked) {
    // Handle checked state
    this.enableFeature();
  } else {
    // Handle unchecked state
    this.disableFeature();
  }
}
```

### Required Checkbox with Validation
```html
<quang-checkbox
  checkType="checkbox"
  [errorMap]="errors()"
  componentLabel="form.label.mandatoryAgreement"
  helpMessage="form.help.mandatoryNote"
  formControlName="mandatoryConsent"
>
</quang-checkbox>
```

#### TypeScript for Required Validation
```typescript
form = this.fb.group({
  mandatoryConsent: [false, [Validators.requiredTrue]]
});

errors = computed(() => {
  const control = this.form.get('mandatoryConsent');
  if (control?.errors?.['required']) {
    return { mandatoryConsent: { message: 'You must agree to continue' } };
  }
  return {};
});
```

### Grouped Checkboxes
```html
<fieldset>
  <legend>Select your preferences</legend>
  
  <quang-checkbox
    checkType="checkbox"
    componentLabel="form.label.emailUpdates"
    labelPosition="right"
    formControlName="emailUpdates"
  >
  </quang-checkbox>
  
  <quang-checkbox
    checkType="checkbox"
    componentLabel="form.label.smsUpdates"
    labelPosition="right"
    formControlName="smsUpdates"
  >
  </quang-checkbox>
  
  <quang-checkbox
    checkType="checkbox"
    componentLabel="form.label.pushNotifications"
    labelPosition="right"
    formControlName="pushNotifications"
  >
  </quang-checkbox>
</fieldset>
```

### Toggle with Custom States
```html
<quang-checkbox
  checkType="toggle"
  componentLabel="form.label.featureEnabled"
  labelPosition="left"
  [errorMap]="toggleErrors()"
  (changedHandler)="onFeatureToggle($event)"
  formControlName="featureEnabled"
>
</quang-checkbox>
```

#### TypeScript for Custom Toggle Logic
```typescript
onFeatureToggle(enabled: boolean): void {
  if (enabled) {
    // Check if user has permission
    if (!this.userHasPermission()) {
      // Prevent enabling if no permission
      this.form.patchValue({ featureEnabled: false });
      this.showPermissionError();
      return;
    }
    this.activateFeature();
  } else {
    this.deactivateFeature();
  }
}

toggleErrors = computed(() => {
  if (this.permissionError()) {
    return { 
      featureEnabled: { 
        message: 'Insufficient permissions to enable this feature' 
      } 
    };
  }
  return {};
});
```

## Component Behavior

### Input Types

#### Checkbox Type
- **Visual Appearance**: Traditional square checkbox with checkmark
- **User Interaction**: Click to toggle, keyboard space/enter to activate
- **Form Value**: Boolean (true/false)
- **Bootstrap Classes**: Uses `form-check` and `form-check-input` classes

#### Toggle Type
- **Visual Appearance**: Switch-style toggle with sliding indicator
- **User Interaction**: Click to slide toggle, keyboard space/enter to activate
- **Form Value**: Boolean (true/false)
- **Bootstrap Classes**: Uses `form-switch` and related switch styling

### Label Positioning Behavior

#### Top Position (Default)
- **Layout**: Flexbox column with label above input
- **Best For**: Most common layout, works well for both checkboxes and toggles
- **Responsive**: Stacks nicely on mobile devices

#### Bottom Position
- **Layout**: Flexbox column-reverse with label below input
- **Best For**: Special layouts where additional context follows the choice
- **Usage**: Less common but useful for specific design requirements

#### Left Position
- **Layout**: Flexbox row with label to the left of input
- **Best For**: Toggles in settings panels, inline forms
- **Behavior**: Label and input are horizontally aligned

#### Right Position
- **Layout**: Flexbox row-reverse with label to the right of input
- **Best For**: List-style interfaces, toggle lists
- **Behavior**: Input appears first, then label

### Form Integration Patterns

#### Reactive Forms
```typescript
// Basic checkbox form
checkboxForm = this.fb.group({
  newsletter: [false],
  terms: [false, Validators.requiredTrue],
  marketing: [true] // Default checked
});

// Toggle switches for settings
settingsForm = this.fb.group({
  darkMode: [false],
  notifications: [true],
  autoSave: [false]
});

// Grouped preferences
preferencesForm = this.fb.group({
  communications: this.fb.group({
    email: [true],
    sms: [false],
    push: [true]
  }),
  privacy: this.fb.group({
    shareData: [false],
    analytics: [true],
    cookies: [true]
  })
});
```

#### Template-driven Forms
```html
<!-- Basic checkbox with ngModel -->
<quang-checkbox
  [(ngModel)]="isSubscribed"
  checkType="checkbox"
  name="subscription"
  componentLabel="Subscribe to newsletter"
>
</quang-checkbox>

<!-- Toggle with validation -->
<quang-checkbox
  [(ngModel)]="agreedToTerms"
  checkType="checkbox"
  name="terms"
  #termsRef="ngModel"
  required
  componentLabel="I agree to the terms and conditions"
>
</quang-checkbox>
<div *ngIf="termsRef.invalid && termsRef.touched" class="text-danger">
  You must agree to the terms to continue
</div>
```

### Validation Integration

#### Built-in Validators
```typescript
// Required checkbox (must be checked)
form = this.fb.group({
  consent: [false, Validators.requiredTrue]
});

// Custom validation
form = this.fb.group({
  agreement: [false, this.customCheckboxValidator]
});

customCheckboxValidator(control: AbstractControl): ValidationErrors | null {
  if (control.value !== true) {
    return { required: { message: 'This field must be checked' } };
  }
  return null;
}
```

#### Conditional Validation
```typescript
// Validation based on other form values
form = this.fb.group({
  enableFeature: [false],
  featureConfig: ['', []]
});

ngOnInit() {
  // Add validation to featureConfig when enableFeature is checked
  this.form.get('enableFeature')?.valueChanges.subscribe(enabled => {
    const configControl = this.form.get('featureConfig');
    if (enabled) {
      configControl?.setValidators([Validators.required]);
    } else {
      configControl?.clearValidators();
    }
    configControl?.updateValueAndValidity();
  });
}
```

### Accessibility Implementation

#### Keyboard Navigation
- **Tab**: Navigate to/from checkbox
- **Space**: Toggle checkbox state
- **Enter**: Toggle checkbox state (alternative to space)
- **Escape**: No default behavior (focus remains on checkbox)

#### Screen Reader Support
- **Role Attributes**: Proper `checkbox` or `switch` roles
- **Label Association**: `htmlFor` and `id` attribute linking
- **State Announcements**: Checked/unchecked state announced
- **Validation Messages**: Error and help text properly associated

#### Focus Management
- **Focus Indicators**: Clear visual focus styling
- **Focus Order**: Logical tab progression
- **Focus Persistence**: Focus maintained during state changes

### Performance Considerations

#### Change Detection
- **OnPush Strategy**: Optimized change detection for better performance
- **Signal-based**: Uses Angular signals for reactive state management
- **Event Handling**: Efficient event delegation and handling

#### Form Performance
```typescript
// Debounced checkbox changes for expensive operations
form = this.fb.group({
  expensiveToggle: [false]
});

ngOnInit() {
  this.form.get('expensiveToggle')?.valueChanges
    .pipe(
      debounceTime(300),
      takeUntilDestroyed()
    )
    .subscribe(value => {
      if (value) {
        this.performExpensiveOperation();
      }
    });
}
```

## Advanced Configuration

### Custom Styling
```scss
// Custom checkbox styles
.custom-checkbox {
  .form-check-input {
    border-radius: 8px;
    border: 2px solid #007bff;
    
    &:checked {
      background-color: #007bff;
      border-color: #007bff;
    }
    
    &:focus {
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    }
  }
  
  .form-label {
    font-weight: 600;
    color: #495057;
  }
}

// Custom toggle styles
.custom-toggle {
  .form-switch .form-check-input {
    width: 3rem;
    height: 1.5rem;
    background-color: #6c757d;
    
    &:checked {
      background-color: #28a745;
    }
    
    &:focus {
      box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.25);
    }
  }
}
```

### Dynamic Label Updates
```typescript
// Dynamic label based on state
dynamicLabel = computed(() => {
  const isEnabled = this.form.get('feature')?.value;
  return isEnabled ? 'feature.enabled' : 'feature.disabled';
});
```

```html
<quang-checkbox
  checkType="toggle"
  [componentLabel]="dynamicLabel()"
  labelPosition="left"
  formControlName="feature"
>
</quang-checkbox>
```

### Conditional Rendering
```html
<!-- Show different checkboxes based on user role -->
<quang-checkbox
  *ngIf="userRole === 'admin'"
  checkType="toggle"
  componentLabel="admin.settings.advancedMode"
  formControlName="advancedMode"
>
</quang-checkbox>

<quang-checkbox
  *ngIf="userRole === 'user'"
  checkType="checkbox"
  componentLabel="user.settings.simpleOption"
  formControlName="simpleOption"
>
</quang-checkbox>
```

### Integration with State Management
```typescript
// Redux/NgRx integration
onToggleChange(checked: boolean): void {
  this.store.dispatch(updateUserPreference({
    key: 'notifications',
    value: checked
  }));
}

// Observable pattern
preferences$ = this.preferencesService.getPreferences();

ngOnInit() {
  this.preferences$.subscribe(prefs => {
    this.form.patchValue({
      notifications: prefs.notifications,
      darkMode: prefs.darkMode
    });
  });
}
```

## Best Practices

### UX Guidelines
- **Clear Labels**: Use descriptive labels that clearly explain what the checkbox controls
- **Consistent Positioning**: Maintain consistent label positioning throughout your application
- **Appropriate Types**: Use checkboxes for binary options, toggles for settings/features
- **Logical Grouping**: Group related checkboxes using fieldsets and legends

### Form Design
- **Required Indicators**: Use asterisks or other clear indicators for required checkboxes
- **Help Text**: Provide explanatory text for complex or important options
- **Validation Timing**: Validate on blur or submit rather than on every change
- **Default States**: Set appropriate default values based on user expectations

### Accessibility Best Practices
- **Label Association**: Always provide meaningful labels
- **Error Messages**: Use clear, specific error messages
- **Focus Management**: Ensure logical tab order and clear focus indicators
- **Testing**: Test with actual assistive technologies

### Performance Guidelines
- **Minimize Watchers**: Avoid unnecessary form value subscriptions
- **Debounce Expensive Operations**: Use debouncing for operations triggered by checkbox changes
- **OnPush Strategy**: Leverage OnPush change detection for better performance
- **Memory Management**: Properly clean up subscriptions and event listeners

## Troubleshooting

### Common Issues

#### Checkbox not responding to clicks
- **Check Form Control**: Ensure formControlName is correctly bound
- **Verify Disabled State**: Check if checkbox is accidentally disabled
- **Event Handling**: Verify event handlers are properly implemented
- **CSS Interference**: Check for CSS that might block pointer events

#### Label positioning issues
- **Bootstrap Dependencies**: Ensure Bootstrap CSS is properly loaded
- **CSS Conflicts**: Check for conflicting CSS rules
- **Layout Container**: Verify parent container allows proper flexbox behavior
- **Responsive Behavior**: Test label positioning on different screen sizes

#### Validation not working
- **Form Setup**: Verify reactive form is properly configured
- **Validator Configuration**: Check that validators are correctly applied
- **Error Map**: Ensure errorMap is properly structured and passed
- **Validation Timing**: Verify validation triggers (touched, dirty, etc.)

#### Toggle switch styling issues
- **Bootstrap Version**: Ensure compatible Bootstrap version for form-switch
- **CSS Import**: Verify all necessary Bootstrap components are imported
- **Custom Styling**: Check for conflicting custom styles
- **Browser Compatibility**: Test toggle appearance across different browsers

### Form Integration Problems

#### Value not updating in form
- **Two-way Binding**: Check ngModel or formControl binding
- **Value Type**: Ensure form expects boolean values
- **Initial Values**: Verify initial form values are set correctly
- **Change Detection**: Check if component is properly detecting changes

#### Validation state not displaying
- **Error Map Structure**: Verify error map contains correct field names
- **Validation Messages**: Check that validation messages are properly translated
- **CSS Classes**: Ensure Bootstrap validation classes are properly applied
- **Timing Issues**: Verify validation runs at appropriate times

### Styling and Layout Issues

#### Responsive layout problems
- **Flexbox Support**: Ensure proper flexbox support in target browsers
- **Mobile Testing**: Test label positioning on mobile devices
- **Container Width**: Check parent container width constraints
- **Media Queries**: Implement responsive adjustments if needed

#### Custom styling not applying
- **CSS Specificity**: Ensure custom styles have sufficient specificity
- **Component Encapsulation**: Check ViewEncapsulation settings
- **Class Application**: Verify componentClass input is working
- **Style Loading Order**: Check CSS loading order and inheritance

### Accessibility Issues

#### Screen reader problems
- **Label Association**: Verify label and input are properly associated
- **Role Attributes**: Check that appropriate roles are set
- **State Announcements**: Test with actual screen readers
- **Focus Management**: Ensure focus is properly managed

#### Keyboard navigation issues
- **Tab Order**: Verify logical tab progression
- **Key Handlers**: Check that space and enter keys work
- **Focus Indicators**: Ensure visible focus styling
- **Event Propagation**: Check for event handling conflicts

## Notes

This component extends `QuangBaseComponent` and inherits all its features, including label management, validation display, error handling, and success messages. It integrates seamlessly with Angular's form systems and provides extensive customization options for various use cases.

### Bootstrap Integration
The component leverages Bootstrap's form classes for consistent styling:
- **Checkbox**: Uses `form-check`, `form-check-input`, and `form-check-label`
- **Toggle**: Uses `form-switch` and related switch styling classes
- **Validation**: Uses `is-valid` and `is-invalid` classes for visual feedback

### QuangTranslationService Integration
- **Automatic Translation**: All labels, help text, and error messages are automatically translated
- **Key Support**: Use translation keys for all text content
- **Fallback Handling**: Provides graceful fallback when translations are unavailable
- **Dynamic Language**: Responds to language changes without component reload

### Form Control Value Types
The component expects and returns boolean values:
- **Checked**: `true`
- **Unchecked**: `false`
- **Initial State**: Can be set via form control initial value or ngModel
