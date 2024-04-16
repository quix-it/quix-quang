import { NgIf } from '@angular/common'
import { Component, computed, input, signal } from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'

import { skip } from 'rxjs'

import { QuangLoaderService } from './loader.service'

@Component({
  selector: 'quang-loader',
  standalone: true,
  imports: [NgIf],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class QuangLoaderComponent {
  disableDelay = input<number>(500)
  minimunDelay = input<number>(200)

  _loadingCount = signal<number>(0)
  _showLoader = computed(() => {
    return this._loadingCount() > 0
  })
  _hideTimeout = signal<any | undefined>(undefined)
  hideTimeout: any | undefined = undefined

  _takeUntilDestroyed = signal(takeUntilDestroyed())

  constructor(private readonly loaderService: QuangLoaderService) {
    this.onLoading()
  }

  // effect(() => {
  // if (this._loadingCount() > 0) {
  //   console.log('QUELLO CHE VUOI')
  //   if (this._hideTimeout()) {
  //     clearTimeout(this._hideTimeout())
  //     this._hideTimeout.set(undefined)
  //   }
  //   if (!this._showLoader()) {
  //     this._showLoader.set(true)
  //     // this.changeDetectorRef.detectChanges() // TODO check if need
  //   }
  // } else {
  //   this._loadingCount.set(0)
  //   clearTimeout(this._hideTimeout())
  //   this._hideTimeout.set(
  //     setTimeout(() => {
  //       this._showLoader.set(false)
  //       // this.changeDetectorRef.detectChanges() // TODO check if need
  //     }, this.disableDelay())
  //   )
  // }
  // })

  onLoading(): void {
    toObservable(this.loaderService._isLoading)
      .pipe(this._takeUntilDestroyed(), skip(1))
      .subscribe((isLoading) => {
        console.log(isLoading, this._showLoader(), this._loadingCount())
        if (isLoading) {
          this._loadingCount.update((count) => count + 1)
        } else {
          this._loadingCount.update((count) => count - 1)
        }
      })

    // this.loaderService._isLoading
  }
}
