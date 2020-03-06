import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ToastsService} from './toasts.service';
import {ToastsModel} from './toasts.model';

@Component({
  selector: 'quix-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent implements OnInit, AfterViewInit {
  data: ToastsModel;
  @ViewChild('toastDom', {static: false}) toastDom: ElementRef;


  constructor(private toastsService: ToastsService, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.data = new ToastsModel('', 'error');

  }

  ngAfterViewInit() {
    this.observeToasts();
  }

  observeToasts() {
    this.toastsService.toasts.subscribe(
      (value: ToastsModel) => {
        if (value) {
          this.data = value;
          this.open();
        }
      },
      (error) => {
        console.log('toast error');
      }
    );
  }

  open() {
    this.renderer.setStyle(this.toastDom.nativeElement, 'opacity', '1');
    if (this.data.timing) {
      setTimeout(() => {
        this.renderer.setStyle(this.toastDom.nativeElement, 'opacity', '0');
      }, this.data.timing);
    }
  }

  close() {
    this.renderer.setStyle(this.toastDom.nativeElement, 'opacity', '0');
  }
}
