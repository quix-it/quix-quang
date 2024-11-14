import { NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

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
  standalone: true,
  imports: [NgIf],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuangLoaderComponent {
  disableDelay = input<number>(500)

  _loadingCount = signal<number | null>(null)

  _showLoader = computed(() => (this._loadingCount() ?? 0) > 0)

  private readonly loaderService = inject(QuangLoaderService)

  private timeoutId: any | null = null

  constructor() {
    this.loaderService.isLoading$.pipe(takeUntilDestroyed()).subscribe((isLoading) => {
      if (this.timeoutId !== null) {
        clearTimeout(this.timeoutId)
        this.timeoutId = null
        this._loadingCount.set(0)
      }
      if (isLoading) {
        this._loadingCount.update((value) => (value ?? 0) + 1)
      } else if ((this._loadingCount() ?? 0) > 1) {
        this._loadingCount.update((value) => (value ?? 0) - 1)
      } else {
        this.timeoutId = setTimeout(() => {
          this._loadingCount.set(0)
        }, this.disableDelay())
      }
    })
  }
}
