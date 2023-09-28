import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core'
import { QuangPicture } from './picture.model'

/**
 * picture component decorator
 */
@Component({
  selector: 'quang-picture',
  templateUrl: './picture.component.html',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * picture component
 */
export class PictureComponent implements AfterViewInit {
  /**
   * Html id of input
   */
  @Input() id: string = ''
  /**
   * The alt tag of the image
   */
  @Input() alt: string = ''
  /**
   * The list of images for the responsive view of the source,
   * always insert the sorted list from the smallest to the largest view
   */
  @Input() picture: QuangPicture | null = null
  /**
   * the image displayed by default while the browser is loading the real image
   */
  @Input() loadingSrc: string = 'assets/images/lazy/default-placeholder.png'
  /**
   * arialabel for the image
   */
  @Input() ariaLabel: string = ''
  @ViewChild('image') image: ElementRef<HTMLImageElement> | undefined =
    undefined
  @ViewChildren('source') sources:
    | QueryList<ElementRef<HTMLSourceElement>>
    | undefined = undefined
  observerImage: IntersectionObserver | undefined = undefined
  observerSource: IntersectionObserver | undefined = undefined

  ngAfterViewInit(): void {
    this.observerImage = new IntersectionObserver(this.changeSrc, {
      root: document.body,
      rootMargin: '16px',
      threshold: 0.5
    })
    this.observerSource = new IntersectionObserver(this.changeSrcset, {
      root: document.body,
      rootMargin: '16px',
      threshold: 0.5
    })
    if (this.image && this.sources) {
      this.observerImage.observe(this.image.nativeElement)
      this.sources.forEach((s: ElementRef<HTMLSourceElement>) => {
        this.observerSource?.observe(s.nativeElement)
      })
    }
  }

  changeSrc(entries: any, observer: any): void {
    if (entries[0].isIntersecting) {
      entries[0].target.src = entries[0].target.dataset.src
      observer?.unobserve(entries[0].target)
    }
  }

  changeSrcset(entries: any, observer: any): void {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        entry.target.srcset = entry.target.dataset.srcset
        observer?.unobserve(entry.target)
      }
    })
  }
}
