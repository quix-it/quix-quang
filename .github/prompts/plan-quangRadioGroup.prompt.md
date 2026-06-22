## Plan: Implement `quang-radio-group` (required options + per-option templates)

Add a new standalone CVA component extending `QuangBaseComponent` with a required `radioOptions` input declared via `input.required`. Each option is a `RadioOption` exported from the entrypoint, and can include an optional `renderer?: TemplateRef<...>` (same pattern as `quang-table` renderers) with a plain-label fallback. Include `radioPosition: 'left' | 'right'` to swap control/label order.

### Steps
1. Mirror CVA + validation UI patterns from [projects/quang/components/checkbox/checkbox.component.ts](projects/quang/components/checkbox/checkbox.component.ts) and the base in [projects/quang/components/shared/base/base.component.ts](projects/quang/components/shared/base/base.component.ts).
2. Create the secondary entrypoint folder [projects/quang/components/radio-group](projects/quang/components/radio-group) with `ng-package.json`, `index.ts`, and the component source files.
3. Define and export `RadioOption` from [projects/quang/components/radio-group/index.ts](projects/quang/components/radio-group/index.ts); include `value`, `label?`, `disabled?`, and `renderer?: TemplateRef<...>`.
4. Implement `QuangRadioGroupComponent` to extend `QuangBaseComponent<string | number | null>` and declare `radioOptions = input.required<RadioOption[]>()`, plus `radioPosition` input.
5. Implement the template to render each option’s `renderer` (with context) or default label, and wire change/blur to the base CVA callbacks and disabled state.

### Further Considerations
1. Template context: `{ $implicit: option, selected, index }` to avoid extra “payload” wrappers.
2. Option type reuse: keep `value: string | number | null` consistent with [projects/quang/components/shared/option-list/option-list.component.ts](projects/quang/components/shared/option-list/option-list.component.ts).
3. Exports: components are consumed via secondary entrypoints; no change to [projects/quang/index.ts](projects/quang/index.ts) unless you want a root barrel later.
