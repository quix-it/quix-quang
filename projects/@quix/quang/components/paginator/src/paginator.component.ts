import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core'
/**
 * paginator component decorator
 */
@Component({
  selector: 'quang-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
/**
 * paginator component
 */
export class QuangPaginatorComponent {
  /**
   * Html id of input
   */
  @Input() id: string = ''
  /**
   * Array of additional classes to the input field
   */
  @Input() customClass: string[] = []
  /**
   * Total number of records
   */
  @Input() totalItems: number = 0
  /**
   * Indicate the position in the page navigation flow with the tab key
   */
  @Input() tabIndex: number = 0
  /**
   * Determine the arialabel tag for accessibility,
   * If not specified, it takes 'input' concatenated to the label by default
   */
  @Input() ariaLabel: string = `Paginator ${this.id}`
  /**
   * List of selectable page sizes
   */
  @Input() sizeList: number[] = []
  /**
   * Page size
   */
  @Input() set pageSize(val: number) {
    this._pageSize = val
  }
  /**
   * Page index
   */
  @Input() pageIndex: number = 1
  /**
   * if value true set all elements at same tabIndex of quang-paginator (best practise set to 0 for accessibility)
   */
  @Input() isAccessible: boolean = false
  /**
   * if value true add elements label near pages
   */
  @Input() showTotalElementsCount: boolean = false
  /**
   * Raises an event when the page index changes
   */
  @Output() whenPageChange: EventEmitter<number> = new EventEmitter<number>()
  /**
   * Raises an event when the page size changes
   */
  @Output() whenSizeChange: EventEmitter<number> = new EventEmitter<number>()
  /**
   * The html input element
   */
  @ViewChild('input', { static: true }) input:
    | ElementRef<HTMLSelectElement>
    | undefined
  /**
   * Size of the list
   */
  _length: number = 0
  /**
   * Page index state
   */
  _page: number = 1
  /**
   * page size state
   */
  _pageSize: number = 0
  /**
   * number of pages
   */
  _totalPages: number = 0

  /**
   * constructor
   * @param renderer html access
   */
  constructor(private readonly renderer: Renderer2, private readonly changeDetectionRef: ChangeDetectorRef) {}

  /**
   * When the page index changes, it saves the state and issues the event
   * @param event
   */
  onChangePage(event: { page: number; itemsPerPage: number }): void {
    if (event.page !== this._page) {
      this._page = event.page
      this.whenPageChange.emit(this._page)
    }
  }

  /**
   * When the page size changes, it saves the state and issues the event
   * @param event
   */
  onChangeSize(event: any): void {
    this._pageSize = parseInt(event.target.value)
    this.whenSizeChange.emit(this._pageSize)
    if (this._page > 1) {
      this.goToFirstPage()
    }
  }

  /**
   * Go to the first page of the pager
  */
 goToFirstPage(): void {
   this._page = 1
   this.changeDetectionRef.detectChanges()
  }

  getNumPages(n: number): void {
    this._totalPages = n
    this.changeDetectionRef.detectChanges()
  }
}
