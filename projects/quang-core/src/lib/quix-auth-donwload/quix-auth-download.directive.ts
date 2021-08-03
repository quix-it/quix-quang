import { Directive, ElementRef, HostListener, Input } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

@Directive({
  selector: '[quangAuthDownload]'
})
export class QuixAuthDownloadDirective {
  /**
   * The url to find the file to download
   */
  @Input() url: string
  /**
   * The name of the file I will download
   */
  @Input() fileName: string
  /**
   * The content type of the file I will download
   */
  @Input() contentType: string

  @HostListener('click', ['$event']) onClick (e) {
    e.preventDefault()
    this.downloadFile()
  }

  constructor (
    private readonly http: HttpClient,
  ) {
  }

  /**
   * Download the file,
   * create a temporary tag a download the blob with an ajax call,
   * start the download and remove the temporary tag
   */
  downloadFile () {
    let anchor = document.createElement('a')
    document.body.appendChild(anchor)
    const headers = new HttpHeaders({
      'Content-Type': this.contentType,
      'Accept': this.contentType
    })
    this.http.get(this.url, { headers: headers, responseType: 'blob' as 'json' }).pipe(
      switchMap((resp: any) => of(new Blob([resp], { type: resp.type }))),
    ).subscribe(blob => {
      let objectUrl = window.URL.createObjectURL(blob)
      anchor.href = objectUrl
      anchor.download = this.fileName
      anchor.click()
      window.URL.revokeObjectURL(objectUrl)
      document.body.removeChild(anchor)
    })
  }
}
