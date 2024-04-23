import { NgIf } from '@angular/common'
import { Component, input, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { BehaviorSubject } from 'rxjs'

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
  minimumDelay = input<number>(200)

  _loadingCount$ = new BehaviorSubject<number | null>(null)
  _showLoader = signal<boolean>(false)

  /*_showLoader$ = computed(() => {
    return this._loadingCount() > 0
  })*/
  _hideTimeout = signal<any | undefined>(undefined)
  hideTimeout: any | undefined = undefined

  _takeUntilDestroyed = signal(takeUntilDestroyed())

  constructor(private readonly loaderService: QuangLoaderService) {
    this.onLoading()
    console.log('ciaoni')
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
    this.loaderService.isLoading$.pipe(this._takeUntilDestroyed()).subscribe((_isLoading) => {
      console.log('_isLoading', _isLoading)
      if (_isLoading === null) {
        return
      }
      const isLoading: boolean = _isLoading as boolean
      console.log('isLoading', isLoading)
      /*console.log(isLoading, this._showLoader(), this._loadingCount())*/
      if (isLoading) {
        this._loadingCount$.next((this._loadingCount$.value ?? 0) + 1)
      } else {
        if ((this._loadingCount$.value ?? 0) > 0) {
          this._loadingCount$.next((this._loadingCount$.value ?? 0) - 1)
        } else {
          this._loadingCount$.next(0)
        }
      }
    })

    this._loadingCount$.pipe(this._takeUntilDestroyed()).subscribe((_loadingCount) => {
      console.log('_loadingCount', _loadingCount)
      if (_loadingCount === null) {
        return
      }
      const loadingCount: number = _loadingCount as number
      if (loadingCount > 0) {
        console.log('QUELLO CHE VUOI')
        if (this._hideTimeout()) {
          clearTimeout(this._hideTimeout())
          this._hideTimeout.set(undefined)
        }
        if (!this._showLoader()) {
          this._showLoader.set(true)
        }
      } else {
        clearTimeout(this._hideTimeout())
        this._hideTimeout.set(
          setTimeout(() => {
            this._showLoader.set(false)
          }, this.disableDelay())
        )
      }
    })
  }
}
