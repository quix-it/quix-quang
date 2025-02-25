import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Directive, HostListener, Input } from '@angular/core'

import { of } from 'rxjs'
import { switchMap } from 'rxjs/operators'

/**
 * directive decorator
 */
@Directive({
  selector: '[quangDownload]'
})
/**
 * download auth file directive
 */
export class QuangDownloadDirective {
  /**
   * The url to find the file to download
   */
  @Input() url: string = ''
  /**
   * The name of the file I will download
   */
  @Input() fileName: string = ''
  /**
   * The content type of the file I will download
   */
  @Input() contentType: string = ''
  /**
   * The accept type of the file I will download
   */
  @Input() accept: string = ''

  /**
   * click listener
   * @param e event
   */
  @HostListener('click', ['$event']) onClick(e: Event): void {
    e.preventDefault()
    this.downloadFile()
  }

  /**
   * constructor
   * @param http
   */
  constructor(private readonly http: HttpClient) {}

  /**
   * Download the file,
   * create a temporary tag a download the blob with an ajax call,
   * start the download and remove the temporary tag
   */
  downloadFile(): void {
    const anchor = document.createElement('a')
    document.body.appendChild(anchor)
    const headers = new HttpHeaders({
      'Content-Type': this.contentType ? this.contentType : 'application/octet-stream',
      Accept: this.accept ? this.accept : 'application/json'
    })
    this.http
      .get(this.url, { headers, responseType: 'blob' as 'json', observe: 'response' })
      .pipe(
        switchMap((r: any) => {
          return of([
            new Blob([r.body], { type: r.body?.type }),
            this.getFilename(r.headers.get('content-disposition'))
          ])
        })
      )
      .subscribe(([blob, fileName]) => {
        let objectUrl
        if (typeof blob !== 'string') objectUrl = window.URL.createObjectURL(blob)
        anchor.href = objectUrl
        anchor.download = this.fileName ? this.fileName : (fileName as string)
        anchor.click()
        window.URL.revokeObjectURL(objectUrl)
        document.body.removeChild(anchor)
      })
  }

  /**
   * Set name to downloaded file
   * @param cd
   */
  getFilename(cd: string): string {
    return cd.slice(cd.indexOf('filename=')).replace('filename=', '').trim()
  }
}
