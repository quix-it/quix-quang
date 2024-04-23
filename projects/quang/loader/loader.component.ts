import { NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { QuangLoaderService } from './loader.service'

@Component({
  selector: 'quang-loader',
  standalone: true,
  imports: [NgIf],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuangLoaderComponent {
  disableDelay = input<number>(500)

  _loadingCount = signal<number | null>(null)
  _showLoader = computed(() => {
    return (this._loadingCount() ?? 0) > 0
  })

  _takeUntilDestroyed = signal(takeUntilDestroyed())

  _loaderService = signal(inject(QuangLoaderService))

  _hideTimeout = signal<any>(undefined)

  constructor() {
    this.onLoading()
  }

  onLoading() {
    this._loaderService()
      .isLoading$.pipe(this._takeUntilDestroyed())
      .subscribe((isLoading) => {
        console.log('this._loadingCount', this._loadingCount())
        const hideTimeout = this._hideTimeout()
        if (hideTimeout) {
          clearTimeout(hideTimeout)
          this._hideTimeout.set(undefined)
        }
        if (isLoading) {
          this._loadingCount.update((value) => (value ?? 0) + 1)
        } else {
          if ((this._loadingCount() ?? 0) > 1) {
            this._loadingCount.update((value) => (value ?? 0) - 1)
          } else {
            this._hideTimeout.set(
              setTimeout(() => {
                this._loadingCount.set(0)
              }, this.disableDelay())
            )
          }
        }
      })
  }
}
