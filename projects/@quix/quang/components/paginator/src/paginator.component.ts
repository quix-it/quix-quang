import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core'

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
   * if value true set all elements at same tabIndex of quang-paginator (best practise set to 0 for accessibility)
   */
  @Input() isAccessible: boolean = false
  /**
   * if value true add elements label near pages
   */
  @Input() showTotalElementsCount: boolean = true
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
  @ViewChild('input', { static: true }) input: ElementRef<HTMLSelectElement> | undefined
  /**
   * Size of the list
   */
  _length: number = 0
  /**
   * Page index state
   */
  @Input() page?: number
  /**
   * number of pages
   */
  _totalPages: number = 0

  /**
   * constructor
   * @param renderer html access
   */
  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  /**
   * page size state
   */
  _pageSize: number

  get pageSize(): number {
    return this._pageSize
  }

  /**
   * Page size
   */
  @Input() set pageSize(val: number) {
    this._pageSize = val
  }

  /**
   * When the page index changes, it saves the state and issues the event
   * @param event
   */
  onChangePage(event: { page: number; itemsPerPage: number }): void {
    this.page = event.page
    this.whenPageChange.emit(this.page)
  }

  /**
   * When the page size changes, it saves the state and issues the event
   * @param event
   */
  onChangeSize(event: any): void {
    this._pageSize = parseInt(event.target.value)
    this.whenSizeChange.emit(this._pageSize)
    if (!this.page || this.page > 1) {
      this.goToFirstPage()
    } else {
      this.whenPageChange.emit(this.page)
    }
  }

  /**
   * Go to the first page of the pager
   */
  goToFirstPage(): void {
    this.page = 1
    this.whenPageChange.emit(this.page)
    this.changeDetectorRef.detectChanges()
  }

  getNumPages(n: number): void {
    this._totalPages = n
    this.changeDetectorRef.detectChanges()
  }
}
