# Quang UI components

In this folder, you will find all the components with a style based on Bootstrap v5.3.

The purpose of these components is to provide a simple and quick way to create responsive and modern applications.

All the components extend the `QuangBaseComponent` ([shared/quang-base-component.directive.ts](shared/quang-base-component.directive.ts))
that provides a label on top, the specific object below it, and a possible error message underneath.

## Common based components

### Autocomplete

The [autocomplete/autocomplete.component.ts](autocomplete/autocomplete.component.ts) provides real-time
suggestions as the user types, allowing for easy selection from a list of filtered options.

### Checkbox/Toggle

The [checkbox/checkbox.component.ts](checkbox/checkbox.component.ts) can be used as a standard checkbox or as a toggle switch by setting the `checkType` input.

### Datepicker

The [date/date.component.ts](date/date.component.ts) is based on Air Datepicker.

It can be fully customized using the input property `datepickerOptions` (see https://air-datepicker.com/examples)

### Input

The [input/input.component.ts](input/input.component.ts) must be configured using the `componentType` input property as:
* text
* textarea
* password
* email
* number
* url
* search
* tel
* color

### Select

The [select/select.component.ts](select/select.component.ts) supports single or multiple selections from a dropdown list.

### WYSIWYG

The [wysiwyg/wysiwyg.component.ts](wysiwyg/wysiwyg.component.ts) is a rich text editor based on https://github.com/JiHong88/SunEditor, offering a wide range of formatting options
for creating and editing HTML content.

## Other components

The other components in the folder don't have a common structure, but have a style based on Bootstrap too.

### Table

The [table/table.component.ts](table/table.component.ts) allows for displaying data in a tabular format.

### Paginator

The [paginator/paginator.component.ts](paginator/paginator.component.ts) provides controls for navigating through pages of data, supporting configurations
for total items, items per page, and current page.
