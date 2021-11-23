import { Directive, HostListener, Input } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

/**
 * directive decorator
 */
@Directive({
  selector: '[quangAuthDownload]'
})
/**
 * download auth file directive
 */
export class QuixAuthDownloadDirective {
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
  @HostListener('click', ['$event']) onClick (e: Event): void {
    e.preventDefault()
    this.downloadFile()
  }

  /**
   * constructor
   * @param http
   */
  constructor (
    private readonly http: HttpClient
  ) {
  }

  /**
   * Download the file,
   * create a temporary tag a download the blob with an ajax call,
   * start the download and remove the temporary tag
   */
  downloadFile (): void {
    const anchor = document.createElement('a')
    document.body.appendChild(anchor)
    const headers = new HttpHeaders({
      'Content-Type': this.contentType ?? 'application/octet-stream',
      Accept: this.accept ? this.accept : 'application/json'
    })
    this.http.get(this.url, { headers: headers, responseType: 'blob' as 'json', observe: 'response' }).pipe(
      switchMap((r: any) => {
          return of([
            new Blob([r.body], { type: r.body?.type }),
            this.getFilename(r.headers.get('content-disposition'))
          ])
        }
      )
    ).subscribe(([blob, fileName]) => {
      const objectUrl = window.URL.createObjectURL(blob)
      anchor.href = objectUrl
      anchor.download = this.fileName ? this.fileName : fileName as string
      anchor.click()
      window.URL.revokeObjectURL(objectUrl)
      document.body.removeChild(anchor)
    })
  }

  getFilename (cd: string): string {
    return cd
      .slice(cd.indexOf('filename='))
      .replace('filename=', '')
      .trim()
  }
}
