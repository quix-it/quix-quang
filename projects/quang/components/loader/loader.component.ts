import { ChangeDetectorRef, Component, ModuleWithProviders, OnInit, input, signal } from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'

import { QuangLoaderService } from './loader.service'

let forRootInstances = 0

@Component({
  selector: 'quang-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class QuangLoaderComponent implements OnInit {
  disableDelay = input<number>(500)

  _loadingCount = signal<number>(0)
  _showLoader = signal<boolean>(false)
  _hideTimeout = signal<any | undefined>(undefined)

  _takeUntilDestroyed = signal(takeUntilDestroyed())

  constructor(
    private readonly loaderService: QuangLoaderService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.onLoading()
  }

  onLoading(): void {
    toObservable(this.loaderService._isLoading)
      .pipe(this._takeUntilDestroyed())
      .subscribe((isLoading) => {
        if (isLoading) {
          this._loadingCount.update((count) => count++)
        } else {
          this._loadingCount.update((count) => count--)
        }
        if (this._loadingCount() > 0) {
          if (this._hideTimeout()) {
            clearTimeout(this._hideTimeout())
            this._hideTimeout.set(undefined)
          }
          if (!this._showLoader()) {
            this._showLoader.set(true)
            // this.changeDetectorRef.detectChanges() // TODO check if need
          }
        } else {
          this._loadingCount.set(0)
          clearTimeout(this._hideTimeout())
          this._hideTimeout().set(
            setTimeout(() => {
              this._showLoader.set(false)
              // this.changeDetectorRef.detectChanges() // TODO check if need
            }, this.disableDelay())
          )
        }
      })
  }

  static forRoot(): ModuleWithProviders<QuangLoaderComponent> {
    if (forRootInstances > 0) {
      throw new Error(
        'QuangLoaderModule.forRoot() called multiple times. import it in the AppModule or CoreModule once only.'
      )
    }
    return {
      ngModule: QuangLoaderComponent,
      providers: [QuangLoaderService]
    }
  }
}
