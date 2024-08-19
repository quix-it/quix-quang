import { FormControl, FormGroup } from '@angular/forms'

export type FormGroupModel<T> = FormGroup<{
  [K in keyof T]: FormControl<T[K]>
}>

/*
 * @example
 * interface Person {
 *   name: string
 *   lastName: string
 *   age: number
 * }
 *
 * myForm: FormGroupModel<Person> = this.formBuilder.group({
 *   name: this.formBuilder.control<string>('', Validators.required),
 *   lastName: this.formBuilder.control<string>(''),
 *   age: this.formBuilder.control<number>({value: 20, disabled: true})
 * })
 */
