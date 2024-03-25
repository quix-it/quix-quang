import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core'

@Component({
  selector: 'ks-intersection',
  templateUrl: './intersection.component.html',
  styles: []
})
export class IntersectionComponent implements AfterViewInit {
  @ViewChild('imageContainer') container: ElementRef<HTMLDivElement> | null = null
  @ViewChildren('image') imageItem: QueryList<HTMLImageElement> | [] = []
  observer: IntersectionObserver | null = null
  images: string[] = Array(30).fill('https://picsum.photos/500/500?number=')

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(this.changeSrc, {
      root: this.container?.nativeElement as Element,
      rootMargin: '16px',
      threshold: 0.5
    })
    setTimeout(() => {
      this.imageItem.forEach((image: any) => {
        this.observer?.observe(image.nativeElement)
      })
    }, 0)
  }

  changeSrc(entries: any, observer: any): void {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src
        observer?.unobserve(entry.target)
      }
    })
  }
}
