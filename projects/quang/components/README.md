# Quang UI components

In this folder, you will find all the components with a style based on Bootstrap v5.3.

The purpose of these components is to provide a simple and quick way to create responsive and modern applications.

All the components extend the ([`QuangBaseComponent`](shared/quang-base-component.directive.ts))
that provides a label on top, the specific object below it, and a possible error message underneath.

## Common based components

### Autocomplete

The [QuangAutocompleteComponent](autocomplete/autocomplete.component.ts) provides real-time
suggestions as the user types, allowing for easy selection from a list of filtered options.

### Checkbox/Toggle

The [QuangCheckboxComponent](checkbox/checkbox.component.ts) can be used as a standard checkbox or as a toggle switch by
setting the `checkType` input.

### Datepicker

The [QuangDateComponent](date/date.component.ts) is based on Air Datepicker.

It can be fully customized using the input property `datepickerOptions` (see https://air-datepicker.com/examples)

---

<h4 style="color:#f03c15">IMPORTANT</h4>

Remember to add the import

`node_modules/@quix/quang/components/date/global-date.component.scss`

or

`@quix/quang/components/date/global-date.component.scss`

in your global style (suggested "vendors" folder)

---

### Input

The [QuangInputComponent](input/input.component.ts) must be configured using the `componentType` input property as:

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

The [QuangSelectComponent](select/select.component.ts) supports single or multiple selections from a dropdown list.

### WYSIWYG

The [QuangWysiwygComponent](wysiwyg/wysiwyg.component.ts) is a rich text editor based
on https://github.com/JiHong88/SunEditor, offering a wide range of formatting options
for creating and editing HTML content.

---

<h4 style="color:#f03c15">IMPORTANT</h4>

Remember to import

`node_modules/@quix/quang/components/wysiwyg/global-wysiswyg.component.scss`

or

`@quix/quang/components/wysiwyg/global-wysiswyg.component.scss`

in your global style (suggested "vendors" folder)

---

## Other components

The other components in the folder don't have a common structure, but have a style based on Bootstrap too.

### Table

The [QuangTableComponent](table/table.component.ts) allows for displaying data in a tabular format.

### Paginator

The [QuangPaginatorComponent](paginator/paginator.component.ts) provides controls for navigating through pages of data,
supporting configurations
for total items, items per page, and current page.
