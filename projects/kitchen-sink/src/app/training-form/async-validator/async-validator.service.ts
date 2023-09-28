import { Injectable } from '@angular/core'
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors
} from '@angular/forms'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class AsyncValidatorService implements AsyncValidator {
  invalidNames = ['mario', 'luigi', 'giovanni']

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.fakeBECheck(control.value).pipe(
      map((r) => (r ? { exist: true } : null))
    )
  }

  fakeBECheck(name: string) {
    return new Observable((o) => {
      setTimeout(() => {
        o.next(this.invalidNames.includes(name))
        o.complete()
      }, 2000)
    })
  }
}
