import {
  ConnectedPosition,
  ConnectionPositionPair,
  Overlay,
  OverlayPositionBuilder,
  OverlayRef
} from '@angular/cdk/overlay'
import { TemplatePortal } from '@angular/cdk/portal'
import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  inject,
  input,
  signal
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { QuangPopoverComponent } from './popover.component'

@Directive({
  selector: '[quangPopover]',
  standalone: true
})
export class QuangPopoverDirective implements OnInit {
  @HostListener('click') onClick(): void {
    if (this.showMethod() === 'click') this.showHideOverlay()
  }

  @HostListener('mouseenter') onHover(): void {
    if (this.showMethod() === 'hover') this.showHideOverlay()
  }

  @HostListener('mouseleave') onLeave(): void {
    if (this.showMethod() === 'hover') this.detachOverlay()
  }

  showMethod = input<'click' | 'hover'>('click')
  popoverContent = input.required<TemplateRef<any>>({ alias: 'quangPopover' })

  closeOnClickOutside: boolean = true
  quangPopoverPosition = input<'top' | 'bottom' | 'left' | 'right'>('top')

  private top = signal<ConnectedPosition>({
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
    offsetY: -8
  })

  private bottom = signal<ConnectedPosition>({
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetY: 8
  })

  private left = signal<ConnectedPosition>({
    originX: 'start',
    originY: 'center',
    overlayX: 'end',
    overlayY: 'center',
    offsetX: -8
  })

  private right = signal<ConnectedPosition>({
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
    offsetX: 8
  })

  _takeUntilDestroyed = signal(takeUntilDestroyed())

  private overlayRef = signal<OverlayRef | null>(null)

  private readonly overlay = signal(inject(Overlay))
  private readonly overlayPositionBuilder = signal(inject(OverlayPositionBuilder))
  private readonly elementRef = signal(inject(ElementRef))
  private readonly vcr = signal(inject(ViewContainerRef))

  ngOnInit(): void {
    if (this.showMethod() === 'click') {
      this.createOverlayClick()
    } else {
      this.createOverlayHover()
    }
  }

  createOverlayHover(): void {
    const positionStrategy = this.overlayPositionBuilder()
      .flexibleConnectedTo(this.elementRef())
      .withPositions(this.getPositions())
    this.overlayRef.set(this.overlay().create({ positionStrategy }))
  }

  createOverlayClick(): void {
    const scrollStrategy = this.overlay().scrollStrategies.block()
    const positionStrategy = this.overlay()
      .position()
      .flexibleConnectedTo(this.elementRef())
      .withPositions([
        new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' })
      ])

    this.overlayRef.set(
      this.overlay().create({
        positionStrategy,
        scrollStrategy,
        hasBackdrop: true,
        backdropClass: ''
      })
    )

    const overlayRef = this.overlayRef()

    if (overlayRef)
      overlayRef
        .backdropClick()
        .pipe(this._takeUntilDestroyed())
        .subscribe(() => {
          if (this.closeOnClickOutside) {
            this.detachOverlay()
          }
        })
  }

  attachOverlay(): void {
    const createdOverlay = this.overlayRef()
    if (createdOverlay) {
      const x = 'aagagag'
      const templatePortal = new TemplatePortal(this.popoverContent(), this.vcr(), x)
      createdOverlay.attach(templatePortal)
    }
  }

  detachOverlay(): void {
    this.overlayRef()?.detach()
  }

  getPositions(): ConnectedPosition[] {
    switch (this.quangPopoverPosition()) {
      case 'top':
        return [this.top(), this.bottom()]
      case 'bottom':
        return [this.bottom(), this.top()]
      case 'left':
        return [this.left(), this.right()]
      case 'right':
        return [this.right(), this.left()]
      default:
        return [this.top(), this.bottom()]
    }
  }

  showHideOverlay(): void {
    if (this.overlayRef()?.hasAttached()) {
      this.detachOverlay()
    } else {
      this.attachOverlay()
    }
  }
}
