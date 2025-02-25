import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core'

import { of } from 'rxjs'
import { switchMap } from 'rxjs/operators'

/**
 * directive decorator
 */
@Directive({
  selector: '[quangImageSrc]'
})
/**
 * view auth image directive
 */
export class QuangImageSrcDirective implements OnChanges {
  /**
   * The url of the image
   */
  @Input() src: string = ''
  /**
   * The media type accepted
   */
  @Input() accept: string = ''
  /**
   * The content type accepted
   */
  @Input() contentType: string = ''

  /**
   * constructor
   * @param el
   * @param http
   */
  constructor(
    private readonly el: ElementRef,
    private readonly http: HttpClient
  ) {}

  /**
   * Download the image,
   * With an ajax call it downloads the image blob and adds the src attribute with the file just downloaded
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.src?.currentValue) {
      const headers = new HttpHeaders({
        'Content-Type': this.contentType ? this.contentType : 'application/json',
        Accept: this.accept ? this.accept : 'application/json'
      })
      this.http
        .get(this.src, { headers, responseType: 'blob' as 'json' })
        .pipe(switchMap((resp: any) => of(new Blob([resp], { type: resp.type }))))
        .subscribe((blob) => {
          const reader = new FileReader()
          reader.readAsDataURL(blob)
          reader.onload = () => {
            this.el.nativeElement.src = reader.result
          }
        })
    }
  }
}
