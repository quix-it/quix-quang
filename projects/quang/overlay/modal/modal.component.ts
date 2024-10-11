import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay'
import { CdkPortal, PortalModule } from '@angular/cdk/portal'
import { NgClass, NgStyle } from '@angular/common'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnDestroy,
  ViewChild,
  computed,
  inject,
  input,
  output,
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

export type ModalAnimationMode =
  | 'SLIDE_FROM_LEFT_TO_RIGHT'
  | 'SLIDE_FROM_RIGHT_TO_LEFT'
  | 'SLIDE_TOP_TO_BOTTOM'
  | 'SLIDE_BOTTOM_TO_TOP'
  | 'FADE'
@Component({
  selector: 'quang-modal',
  standalone: true,
  imports: [PortalModule, NgStyle, NgClass],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Modal component that leverages Angular CDK's Overlay and Portal modules to create modals with flexible positioning and configurations.
 *
 * @usageNotes
 * The component can be shown by using its selector `quang-modal` with a boolean binded to the Angular directive `*ngIf`.
 *
 * Its structure is divided in 3 `ng-content` to set the header, body and footer.
 * Every section has its own selector and can be used to render custom content in a simple way.
 *
 * `header` section is placed on top, `footer` section is placed on bottom.
 *
 * @example
 * <quang-modal
 *   (backdropClick)="closeModal()"
 *   *ngIf="showModal"
 *   position="right"
 * >
 *   <ng-container header>
 *     <h2>Modal header</h2>
 *   </ng-container>
 *   <ng-container body>
 *     <h3>Modal body</h3>
 *   </ng-container>
 *   <ng-container footer>
 *     <h3>Modal footer</h3>
 *   </ng-container>
 * </quang-modal>
 */
export class QuangModalComponent implements AfterViewInit, OnDestroy {
  @ViewChild(CdkPortal) public readonly portal?: CdkPortal

  backdropClick = output<void>()

  position = input.required<'right' | 'left' | 'center'>()

  height = input<string>('80vh')

  width = input<string>('80vw')

  animationMode = input<ModalAnimationMode>()

  backgroundColor = input<string>()

  showBackdrop = input<boolean>(true)

  private readonly destroyRef = inject(DestroyRef)

  private overlayConfig?: OverlayConfig

  private overlayRef?: OverlayRef

  positionStrategy = computed(() => {
    switch (this.position()) {
      case 'right':
        return this.overlay.position().global().right().top()
      case 'left':
        return this.overlay.position().global().left().top()
      case 'center':
      default:
        return this.overlay.position().global().centerHorizontally().centerVertically()
    }
  })

  animationClass = computed(() => {
    switch (this.animationMode()) {
      case 'SLIDE_FROM_LEFT_TO_RIGHT':
        return 'left-to-right-enter-active'
      case 'SLIDE_FROM_RIGHT_TO_LEFT':
        return 'right-to-left-enter-active'
      case 'SLIDE_TOP_TO_BOTTOM':
        return 'top-to-bottom-enter-active'
      case 'SLIDE_BOTTOM_TO_TOP':
        return 'top-to-bottom-enter-active'
      case 'FADE':
        return 'fade-enter-active'
      default:
        return ''
    }
  })

  constructor(private readonly overlay: Overlay) {}

  ngAfterViewInit(): void {
    this.overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      positionStrategy: this.positionStrategy(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      backdropClass: this.showBackdrop() ? undefined : '',
    })
    this.overlayRef = this.overlay.create(this.overlayConfig)
    this.overlayRef
      .backdropClick()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.backdropClick.emit()
      })
    this.overlayRef?.attach(this.portal)
  }

  ngOnDestroy(): void {
    this.overlayRef?.detach()
    this.overlayRef?.dispose()
  }
}
