import {
  ConnectedOverlayPositionChange,
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayPositionBuilder,
  OverlayRef,
} from '@angular/cdk/overlay'
import { ComponentPortal, ComponentType } from '@angular/cdk/portal'
import {
  ComponentRef,
  DestroyRef,
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  computed,
  inject,
  input,
  signal,
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { QuangBaseOverlayComponent } from './quang-base-overlay.component'

@Directive()
export abstract class QuangBaseOverlayDirective<T extends QuangBaseOverlayComponent> implements OnDestroy {
  targetComponentType = signal<ComponentType<T> | undefined>(undefined)

  /**
   * The amount of pixels needed for the popover to automatically disappear. If undefined the popover will not disappear on scroll
   * Default: 100
   * @default 100
   */
  scrollCloseThreshold = input<number | undefined>(100)

  showMethod = input<'click' | 'hover'>('click')

  content = input.required<any>()

  quangOverlayPayload = input<any>()

  closeOnClickOutside: boolean = true

  overlayPosition = input<
    'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right' | 'left' | 'right'
  >('top')

  destroyRef = inject(DestroyRef)

  private top = signal<ConnectedPosition>({
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
    offsetY: -8,
  })

  private topLeft = signal<ConnectedPosition>({
    originX: 'start',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'bottom',
    offsetY: -8,
    offsetX: 40,
  })

  private topRight = signal<ConnectedPosition>({
    originX: 'end',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'bottom',
    offsetY: -8,
    offsetX: 40,
  })

  private bottom = signal<ConnectedPosition>({
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetY: 8,
  })

  private bottomLeft = signal<ConnectedPosition>({
    originX: 'start',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'top',
    offsetY: 12,
    offsetX: 40,
  })

  private bottomRight = signal<ConnectedPosition>({
    originX: 'end',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'top',
    offsetY: 12,
    offsetX: 40,
  })

  private left = signal<ConnectedPosition>({
    originX: 'start',
    originY: 'center',
    overlayX: 'end',
    overlayY: 'center',
    offsetX: -8,
  })

  private right = signal<ConnectedPosition>({
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
    offsetX: 8,
  })

  tooltipPosition = computed((): ConnectedPosition[] => {
    switch (this.overlayPosition()) {
      case 'top':
        return [this.top(), this.bottom()]
      case 'top-left':
        return [this.topLeft(), this.bottomLeft()]
      case 'top-right':
        return [this.topRight(), this.bottomRight()]
      case 'bottom':
        return [this.bottom(), this.top()]
      case 'bottom-left':
        return [this.bottomLeft(), this.topLeft()]
      case 'bottom-right':
        return [this.bottomRight(), this.topRight()]
      case 'left':
        return [this.left(), this.right()]
      case 'right':
        return [this.right(), this.left()]
      default:
        return [this.top(), this.bottom()]
    }
  })

  private overlayRef = signal<OverlayRef | null>(null)

  private readonly overlay = signal(inject(Overlay))

  private readonly overlayPositionBuilder = signal(inject(OverlayPositionBuilder))

  private readonly elementRef = signal(inject(ElementRef))

  private positionStrategy = signal<FlexibleConnectedPositionStrategy | undefined>(undefined)

  private componentOverlayRef = signal<ComponentRef<T> | null>(null)

  @HostListener('click') onClick(): void {
    if (this.showMethod() === 'click') this.showHideOverlay()
  }

  @HostListener('mouseenter') onHover(): void {
    if (this.showMethod() === 'hover') this.showHideOverlay()
  }

  @HostListener('mouseleave') onLeave(): void {
    if (this.showMethod() === 'hover') this.detachOverlay()
  }

  attachOverlay(): void {
    // eslint-disable-next-line no-console
    console.log(this.elementRef())
    const targetComponentType = this.targetComponentType()
    if (!targetComponentType) {
      return
    }
    this.positionStrategy.set(
      this.overlayPositionBuilder().flexibleConnectedTo(this.elementRef()).withPositions(this.tooltipPosition())
    )

    this.overlayRef.set(
      this.overlay().create({
        positionStrategy: this.positionStrategy(),
        scrollStrategy: this.scrollCloseThreshold()
          ? this.overlay().scrollStrategies.close({ threshold: this.scrollCloseThreshold() })
          : this.overlay().scrollStrategies.noop(),
        hasBackdrop: this.showMethod() === 'click',
        backdropClass: '',
      })
    )

    const componentPortal = new ComponentPortal(targetComponentType)
    const createdOverlay = this.overlayRef()
    if (createdOverlay) {
      this.componentOverlayRef.set(createdOverlay.attach(componentPortal))
      const componentOverlayRefInstance = this.componentOverlayRef()?.instance
      if (componentOverlayRefInstance) {
        componentOverlayRefInstance.content = this.content
        componentOverlayRefInstance.payload = this.quangOverlayPayload
      }
    }
    this.positionStrategy()
      ?.positionChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((position) => {
        const positionRef: ConnectedOverlayPositionChange = position as ConnectedOverlayPositionChange
        const componentOverlayRefInstance = this.componentOverlayRef()?.instance
        if (componentOverlayRefInstance) {
          componentOverlayRefInstance.positionPair.set(positionRef.connectionPair)
        }
      })
    this.overlayRef()
      ?.backdropClick()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.closeOnClickOutside) {
          this.detachOverlay()
        }
      })
  }

  detachOverlay(): void {
    this.overlayRef()?.detach()
    this.overlayRef()?.dispose()
  }

  showHideOverlay(): void {
    if (this.overlayRef()?.hasAttached()) {
      this.detachOverlay()
    } else {
      this.attachOverlay()
    }
  }

  ngOnDestroy(): void {
    this.detachOverlay()
  }
}
