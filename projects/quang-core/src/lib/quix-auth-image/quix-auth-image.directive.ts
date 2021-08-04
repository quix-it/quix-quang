import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

/**
 * directive decorator
 */
@Directive({
  selector: '[quangAuthImage]',
})
/**
 * view auth image directive
 */
export class QuixAuthImageDirective implements OnChanges {
  /**
   * The url of the image
   */
  @Input() src: string

  /**
   * constructor
   * @param el
   * @param http
   */
  constructor (
    private readonly el: ElementRef,
    private readonly http: HttpClient) {
  }

  /**
   * Download the image,
   * With an ajax call it downloads the image blob and adds the src attribute with the file just downloaded
   */
  ngOnChanges (changes: SimpleChanges) {
    if (changes.src.currentValue) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
      this.http.get(this.src, { headers: headers, responseType: 'blob' as 'json' }).pipe(
        switchMap((resp: any) => of(new Blob([resp], { type: resp.type }))),
      ).subscribe(blob => {
        let reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onload = () => this.el.nativeElement.src = reader.result
      })
    }
  }
}
