import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {map, switchMap} from "rxjs/operators";
import {from, Observable, of} from "rxjs";

@Directive({
  selector: '[quixAuthDownload]'
})
export class QuixAuthDownloadDirective {
  @Input() url: string
  @Input() fileName: string
  @Input() contentType: string


  @HostListener('click', ['$event']) onClick(e) {
    e.preventDefault()
    this.downloadFile()
  }

  constructor(
    private http: HttpClient,
    private el: ElementRef
  ) {
  }

  downloadFile() {
    let anchor = document.createElement("a");
    document.body.appendChild(anchor);
    const headers = new HttpHeaders({
      'Content-Type': this.contentType,
      'Accept': this.contentType
    });
    this.http.get(this.url, {headers: headers, responseType: 'blob' as 'json'}).pipe(
      switchMap((resp: any) => of(new Blob([resp], {type: resp.type}))),
    ).subscribe(blob => {
      let objectUrl = window.URL.createObjectURL(blob);
      anchor.href = objectUrl;
      anchor.download = this.fileName
      anchor.click()
      window.URL.revokeObjectURL(objectUrl);
      document.body.removeChild(anchor)
    })
  }
}
