import { animate, style, transition, trigger } from '@angular/animations'
import { Overlay, OverlayConfig } from '@angular/cdk/overlay'
import { CdkPortal, PortalModule } from '@angular/cdk/portal'
import { NgStyle } from '@angular/common'
import { AfterViewInit, Component, OnDestroy, ViewChild, input, output } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'quang-modal',
  standalone: true,
  imports: [PortalModule, NgStyle],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [style({ translate: '100%' }), animate('400ms ease-out', style({ translate: 0 }))]),
      transition(':leave', [style({ translate: 0 }), animate('400ms ease', style({ translate: '100%' }))])
    ])
  ]
})
export class QuangModalComponent implements AfterViewInit, OnDestroy {
  @ViewChild(CdkPortal) public readonly portal?: CdkPortal
  backdropClick = output<void>()
  position = input.required<'right' | 'left' | 'center'>()
  animation = input.required<'right' | 'left' | 'center' | 'top' | 'bottom'>()
  height = input<string>('100vh')
  width = input<string>('700vw')

  private overlayConfig?: OverlayConfig
  private overlayRef: any

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
      scrollStrategy: this.overlay.scrollStrategies.block()
    })
    this.overlayRef = this.overlay.create(this.overlayConfig)
    this.overlayRef
      .backdropClick()
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.backdropClick.emit()
      })
    this.overlayRef?.attach(this.portal)
  }

  ngOnDestroy(): void {
    setTimeout(() => {
      this.overlayRef?.detach()
      this.overlayRef?.dispose()
    }, 450)
  }
}
