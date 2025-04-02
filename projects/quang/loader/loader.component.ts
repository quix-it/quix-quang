import { NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'

import { map, of, switchAll, timer } from 'rxjs'

import { QuangLoaderService } from './loader.service'

/**
 * @example
 * <quang-loader></quang-loader>
 *
 * @example
 * <quang-loader>
 *  custom loader here
 * </quang-loader>
 */
@Component({
  selector: 'quang-loader',
  imports: [NgIf],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuangLoaderComponent {
  /**
   * Minimum time (in milliseconds) to show the loader for
   * @default 500
   */
  showAtLeastFor = input<number>(500)

  private readonly loaderService = inject(QuangLoaderService)

  isLoading = this.loaderService.isLoading

  showLoaderBuffer$ = toObservable(this.isLoading).pipe(
    map((isLoading) => (isLoading ? of(isLoading) : timer(this.showAtLeastFor()).pipe(map(() => isLoading)))),
    switchAll()
  )

  showLoader = toSignal(this.showLoaderBuffer$)
}
