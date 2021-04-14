import {Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";

@Directive({
  selector: '[quangAuthImage]',
})
export class QuixAuthImageDirective implements OnChanges {
  @Input() src: string

  constructor(private el: ElementRef,
              private http: HttpClient) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.src.currentValue) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });
      this.http.get(this.src, {headers: headers, responseType: 'blob' as 'json'}).pipe(
        switchMap((resp: any) => of(new Blob([resp], {type: resp.type}))),
      ).subscribe(blob => {
        let reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onload = () => this.el.nativeElement.src = reader.result
      })
    }
  }
}
