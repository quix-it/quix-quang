import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {QuixToastsService} from './quix-toasts.service';
import {ToastsModel} from './toasts.model';
import {Observable, Subscription} from 'rxjs';
import {ToastsState} from './toasts-store/toasts.reducer';
import {select, Store} from '@ngrx/store';
import {toastStateSelector} from './toasts-store/toasts.selector';

@Component({
  selector: 'quix-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent implements OnInit, AfterViewInit, OnDestroy {
  data: ToastsModel = new ToastsModel('', 'success');
  private $toastState: Observable<any>;
  private subscription: Subscription;
  @ViewChild('toastDom', {static: false}) toastDom: ElementRef;


  constructor(private toastsService: QuixToastsService,
              private renderer: Renderer2,
              private toastStore: Store<ToastsState>) {
  }

  ngOnInit() {
    this.$toastState = this.toastStore.pipe(select(toastStateSelector));
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
