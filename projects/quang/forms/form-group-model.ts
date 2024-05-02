export type FormGroupModel<T> = FormGroup<{
  [K in keyof T]: FormControl<T[K]>
}>
