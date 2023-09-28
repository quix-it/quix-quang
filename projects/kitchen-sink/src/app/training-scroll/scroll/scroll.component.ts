import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core'
import { fromEvent, Subscription } from 'rxjs'

@Component({
  selector: 'ks-scroll',
  templateUrl: './scroll.component.html',
  styles: []
})
export class ScrollComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('scrollerContainer') scrollDiv: ElementRef<HTMLDivElement> | null =
    null
  winRederer: number = 0
  winHostListener: number = 0
  winFromEvent: number = 0
  elRederer: number = 0
  elFromEvent: number = 0

  @HostListener('window:scroll', ['$event'])
  onScroll(e: any): void {
    this.winHostListener = this.getYPosition(e)
  }

  scrollSubscription$: Subscription = fromEvent(window, 'scroll').subscribe(
    (e: Event) => {
      this.winFromEvent = this.getYPosition(e)
    }
  )

  scrollerSubscription$: Subscription = new Subscription()

  constructor(private readonly renderer2: Renderer2) {}

  ngOnInit(): void {
    this.renderer2.listen('window', 'scroll', (e) => {
      this.winRederer = this.getYPosition(e)
    })
  }

  ngAfterViewInit(): void {
    this.scrollerSubscription$ = fromEvent(
      this.scrollDiv?.nativeElement as any,
      'scroll'
    ).subscribe((e) => {
      this.elFromEvent = this.getDivYPosition(e)
    })
    this.renderer2.listen(this.scrollDiv?.nativeElement, 'scroll', (e) => {
      this.elRederer = this.getDivYPosition(e)
    })
  }

  getYPosition(e: any): number {
    return (e.target.scrollingElement as Element).scrollTop
  }

  getDivYPosition(e: any): number {
    return (e.target as Element).scrollTop
  }

  scroll50(): void {
    this.scrollDiv?.nativeElement.scrollTo({ top: this.elFromEvent + 50 })
  }

  ngOnDestroy(): void {
    this.scrollSubscription$.unsubscribe()
    this.scrollerSubscription$.unsubscribe()
  }
}
