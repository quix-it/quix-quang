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
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent implements OnInit, OnChanges {
  @Input() id: string
  @Input() height: string
  @Input() title: boolean
  @Input() subTitle: boolean
  @Input() noLoop: boolean
  @Input() interval: number
  @Input() showIndicators: boolean
  @Input() noPause: boolean = true
  @Input() slideList: QuixCarousel[]
  @Output() onSlideChange: EventEmitter<number> = new EventEmitter<number>()


  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.slideList?.currentValue) {
      this.slideList = changes.slideList.currentValue
    }
    if (changes.height?.currentValue) {
      this.height = changes.height.currentValue
    }
  }

  onSlideEvent(e: number) {
    this.onSlideChange.emit(e)
  }
}
