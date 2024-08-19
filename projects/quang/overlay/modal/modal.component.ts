import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay'
import { CdkPortal, PortalModule } from '@angular/cdk/portal'
import { NgStyle } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, ViewChild, input, output } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'quang-modal',
  standalone: true,
  imports: [PortalModule, NgStyle],
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

  backgroundColor = input<string>()

  showBackdrop = input<boolean>(true)

  private overlayConfig?: OverlayConfig

  private overlayRef?: OverlayRef

  get positionStrategy() {
    switch (this.position()) {
      case 'right':
        return this.overlay.position().global().right().top()
      case 'left':
        return this.overlay.position().global().left().top()
      case 'center':
      default:
        return this.overlay.position().global().centerHorizontally().centerVertically()
    }
  }

  constructor(private readonly overlay: Overlay) {}

  ngAfterViewInit(): void {
    this.overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      positionStrategy: this.positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      backdropClass: this.showBackdrop() ? undefined : '',
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
    this.overlayRef?.detach()
    this.overlayRef?.dispose()
  }
}
