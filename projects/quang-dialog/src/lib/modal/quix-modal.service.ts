import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal'
import { take } from 'rxjs/operators'
/**
 * service decorator
 */
@Injectable({
  providedIn: 'root'
})
/**
 * utility for modal management
 */
export class QuixModalService {
  /**
   * modal configuration
   */
  config: ModalOptions = {
    keyboard: undefined,
    ignoreBackdropClick: undefined,
    class: undefined,
    initialState: undefined,
    animated: true
  }

  /**
   * modal wrapper
   */
  modalRef: BsModalRef | null = null

  /**
   * constructor
   * @param modalService modal utility
   */
  constructor (
    private readonly modalService: BsModalService
  ) {
  }

  /**
   * opens the modal
   * configure the modal
   * select the size
   * pass any data and set the title
   * @param modalComponent
   * @param modalTitle
   * @param size
   * @param modalParams
   * @param closeWithKeyboard
   * @param ignoreCloseWithClick
   */
  openModal (modalComponent: any,
    modalTitle: string,
    size: 'xl' | 'lg' | 'md' | 'sm',
    modalParams?: any,
    closeWithKeyboard?: boolean,
    ignoreCloseWithClick?: boolean
  ): void {
    this.modalRef = new BsModalRef()
    this.config = {
      ...this.config,
      keyboard: closeWithKeyboard,
      ignoreBackdropClick: ignoreCloseWithClick,
      class: '',
      initialState: modalParams
    }
    this.setSize(size)
    this.modalRef = this.modalService.show(modalComponent, this.config)
    this.modalRef.content.title = modalTitle
  }

  /**
   * event that traces the opening of the modal
   */
  onShownEvent (): Observable<any> {
    return this.modalService.onShown.pipe(take(1))
  }

  /**
   * event that traces the opening of the modal
   */
  onShowEvent (): Observable<any> {
    return this.modalService.onShow.pipe(take(1))
  }

  /**
   * event that traces the closure of the modal
   */
  onHideEvent (): Observable<any> {
    return this.modalService.onHide.pipe(take(1))
  }

  /**
   * event that traces the successful closure of the modal
   */
  onHiddenEvent (): Observable<any> {
    return this.modalService.onHidden.pipe(take(1))
  }

  /**
   * on the basis of the requested size, it sets the class of the modal that defines the size
   * @param size
   * @private
   */
  private setSize (size: string): void {
    switch (size) {
      case 'xl':
        this.config.class = 'modal-xl'
        break
      case 'lg':
        this.config.class = 'modal-lg'
        break
      case 'sm':
        this.config.class = 'modal-sm'
        break
      default:
        this.config.class = 'modal-md'
        break
    }
  }
}
