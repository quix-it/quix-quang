import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {QuixToast} from './toast.model';
import {Observable, Subscription} from 'rxjs';
import {ToastsState} from './toast-store/toast.reducer';
import {select, Store} from '@ngrx/store';
import {selectToast} from './toast-store/toast.selector';

@Component({
  selector: 'quix-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class QuixToastComponent implements OnInit, AfterViewInit, OnDestroy {
  data: QuixToast
  private $toastState: Observable<any>;
  private subscription: Subscription;
  @ViewChild('toastDom', {static: false}) toastDom: ElementRef;


  constructor(private renderer: Renderer2,
              private store: Store<any>) {
  }

  ngOnInit() {
    this.$toastState = this.store.pipe(select(selectToast));
  }

  ngAfterViewInit() {
    this.observeToasts();
  }

  observeToasts() {
    this.subscription = this.$toastState.subscribe((data: ToastsState) => {
        if (data.toastData) {
          this.data = data.toastData;
          this.open();
        }
      },
      (error) => {
        alert('Error on toast lifecycle');
      });
  }

  open() {
    this.renderer.setStyle(this.toastDom.nativeElement, 'opacity', '1');
    this.renderer.setStyle(this.toastDom.nativeElement, 'transform', 'scale(1)');
    if (this.data.timing) {
      setTimeout(() => {
        this.renderer.setStyle(this.toastDom.nativeElement, 'opacity', '0');
        this.renderer.setStyle(this.toastDom.nativeElement, 'transform', 'scale(0)');
      }, this.data.timing);
    }
  }

  close() {
    this.renderer.setStyle(this.toastDom.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.toastDom.nativeElement, 'transform', 'scale(0)');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
