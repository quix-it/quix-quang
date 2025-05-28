import { Injectable, computed } from '@angular/core'

import { patchState, signalState } from '@ngrx/signals'

@Injectable({
  providedIn: 'root',
})
export class QuangLoaderService {
  private loaderState = signalState({ count: 0 })

  public isLoading = computed(() => this.loaderState.count() > 0)

  public show(): void {
    patchState(this.loaderState, { count: this.loaderState().count + 1 })
  }

  public hide(): void {
    patchState(this.loaderState, { count: this.loaderState().count - 1 })
  }
}
