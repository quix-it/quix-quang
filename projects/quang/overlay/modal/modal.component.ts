import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay'
import { CdkPortal, PortalModule } from '@angular/cdk/portal'
import { NgStyle } from '@angular/common'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewChild,
  input,
  output,
  signal
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'quang-modal',
  standalone: true,
  imports: [PortalModule, NgStyle],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
  // animations: [trigger('slideInOut', [transition(':enter', fromRightToLeft), transition(':leave', fromLeftToRight)])]
})
export class QuangModalComponent implements AfterViewInit, OnDestroy {
  @ViewChild(CdkPortal) public readonly portal?: CdkPortal

  backdropClick = output<void>()
  position = input.required<'right' | 'left' | 'center'>()
  // animation = input.required<'right' | 'left' | 'center' | 'top' | 'bottom'>()
  height = input<string>('80vh')
  width = input<string>('80vw')
  backgroundColor = input<string>()
  showBackdrop = input<boolean>(true)

  _takeUntilDestroyed = signal(takeUntilDestroyed())

  private overlayConfig?: OverlayConfig
  private overlayRef?: OverlayRef

  get positionStrategy() {
    switch (this.position()) {
      case 'right':
        return this.overlay.position().global().right().top()
      case 'left':
        return this.overlay.position().global().left().top()
      case 'center':
        return this.overlay.position().global().centerHorizontally().centerVertically()
    }
  }

  constructor(private readonly overlay: Overlay) {}

  ngAfterViewInit(): void {
    this.overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      positionStrategy: this.positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      backdropClass: this.showBackdrop() ? undefined : ''
    })
    this.overlayRef = this.overlay.create(this.overlayConfig)
    this.overlayRef
      .backdropClick()
      .pipe(this._takeUntilDestroyed())
      .subscribe(() => {
        this.backdropClick.emit()
      })
    this.overlayRef?.attach(this.portal)
    // this.animationState = 'visible'
  }

  ngOnDestroy(): void {
    // setTimeout(() => {
    this.overlayRef?.detach()
    this.overlayRef?.dispose()
    // }, 300)
  }
}
