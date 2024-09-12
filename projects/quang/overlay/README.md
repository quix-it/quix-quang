# Quang overlay

The purpose of these components and directives is to provide a simple and quick way to create responsive and modern
applications.

All the components extend the [`QuangBaseOverlayDirective`](shared/quang-base-overlay.directive.ts)
that provides a label on top, the specific object below it, and a possible error message underneath.

To use the overlay components, you must install the `@angular/cdk` dependency.

---

<h4 style="color:#f03c15">IMPORTANT</h4>

Remember to add the import

`node_modules/@quix/quang/overlay/global-overlay.scss`

or

`@quix/quang/components/date/global-overlay.scss`

in your global style (suggested "vendors" folder)

---

In this folder you will find the following overlay components:

### Modal

The `QuangModalComponent` is an overlay component used directly in its father component.

To use it import [QuangModalComponent](modal/modal.component.ts).

Read [@example](modal/modal.component.ts) for usage.

### Popover

The `QuangPopoverComponent` is an base overlay popover with its own style.

To use it import [QuangPopoverDirective](popover/popover.directive.ts).

Read [@example](popover/popover.component.ts) for usage.

### Toast

The `QuangToastComponent` is an overlay component used directly in its father component.

To use it import [QuangToastComponent](toast/toast.component.ts) and [QuangToastService](toast/toast.service.ts).

Read [@example](toast/toast.component.ts) for usage.

### Tooltip

The `QuangTooltipComponent` is an base overlay tooltip with its own style.

To use it import [QuangTooltipDirective](tooltip/tooltip.directive.ts)

Read [@example](tooltip/tooltip.component.ts) for usage.
