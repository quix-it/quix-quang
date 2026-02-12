# Quang Overlay Components Index

Welcome to the Quang Overlay Components library! Below is a list of all the overlay components available in this folder, along with links to their detailed documentation.

## Component Documentation

- [Modal Component](./modal/README.md): A modal overlay component used directly in its parent component.
- [Popover Component](./popover/README.md): A base overlay popover with its own style.
- [Toast Component](./toast/README.md): A toast notification component for displaying messages.
- [Tooltip Component](./tooltip/README.md): A base overlay tooltip with its own style.

## Notes

All overlay components extend the [`QuangBaseOverlayDirective`](./shared/quang-base-overlay.directive.ts), which provides common features like labels, error messages, and more.

To use these components, ensure you have installed the `@angular/cdk` dependency and included the necessary SCSS file:

```scss
@import 'node_modules/quang/overlay/global-overlay.scss';
```

or

```scss
@import 'quang/overlay/global-overlay.scss';
```

in your global styles (suggested "vendors" folder).
