import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {QuixCarousel} from "./carousel.model";

@Component({
  selector: 'quix-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent implements OnInit, OnChanges {
    /**
   * Html id of input
   */
  @Input() id: string = ''
  @Input() height: string
  @Input() title: boolean
  @Input() subTitle: boolean
  @Input() noLoop: boolean
  @Input() interval: number | boolean
  @Input() startIndex: number
  @Input() showIndicators: boolean
  @Input() noPause: boolean = true
  @Input() slideList: QuixCarousel[]
  @Output() onSlideChange: EventEmitter<number> = new EventEmitter<number>()


  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.slideList = changes.slideList?.currentValue
    this.height = changes.height?.currentValue
  }

  onSlideEvent(e: number) {
    this.onSlideChange.emit(e)
  }
}
