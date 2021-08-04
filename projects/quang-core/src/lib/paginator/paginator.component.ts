import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output, Renderer2,
  SimpleChanges, ViewChild
} from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
/**
 * paginator component decorator
 */
@Component({
  selector: 'quix-paginator',
  templateUrl: './paginator.component.html',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * paginator component
 */
export class PaginatorComponent implements OnChanges {
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
  @Input() pageSize: number = 0
  /**
   * Page index
   */
  @Input() pageIndex: number = 0
  /**
   * Raises an event when the page index changes
   */
  @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>()
  /**
   * Raises an event when the page size changes
   */
  @Output() onSizeChange: EventEmitter<number> = new EventEmitter<number>()
  @ViewChild('quixPaginator', { static: true }) paginator: MatPaginator
  /**
   * The html input element
   */
  @ViewChild('input', { static: true }) input: ElementRef<HTMLSelectElement>
  /**
   * Size of the list
   */
  _length: number
  /**
   * Page index state
   */
  _pageIndex: number
  /**
   * page size state
   */
  _pageSize: number

  /**
   * constructor
   * @param renderer html access
   */
  constructor (
    private readonly renderer: Renderer2,
  ) {}

  /**
   * When the inputs change, it constricts the internal states of the component and updates the properties of the pager if necessary
   * @param changes
   */
  ngOnChanges (changes: SimpleChanges): void {
    if (changes.totalItems?.currentValue) {
      this._length = changes.totalItems?.currentValue
      this.paginator.length = changes.totalItems?.currentValue
    }
    if (changes.pageIndex) {
      if (changes.pageIndex.currentValue >= 0 && changes.pageIndex.currentValue !== this._pageIndex) {
        this._pageIndex = changes.pageIndex.currentValue
        this.paginator.pageIndex = changes.pageIndex.currentValue
      }
    }
    if (changes.pageSize) {
      if (changes.pageSize.currentValue >= 0 && changes.pageSize.currentValue !== this._pageSize) {
        this.paginator.pageSize = changes.pageSize.currentValue
        this.renderer.setProperty(this.input?.nativeElement, 'value', changes.pageSize.currentValue)
      }
    }
  }

  /**
   * When the page index changes, it saves the state and issues the event
   * @param event
   */
  onChangePage (event): void {
    if (event.pageIndex !== this._pageIndex) {
      this._pageIndex = event.pageIndex
      this.onPageChange.emit(this._pageIndex)
    }
  }

  /**
   * When the page size changes, it saves the state and issues the event
   * @param event
   */
  onChangeSize (event): void {
    this.paginator.pageSize = parseInt((event.target as HTMLInputElement).value)
    this._pageSize = parseInt((event.target as HTMLInputElement).value)
    this.onSizeChange.emit(this._pageSize)
  }

  /**
   * Go to the first page of the pager
   */
  goToFirstPage (): void {
    this.paginator.firstPage()
  }
}
