import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {select, Store} from "@ngrx/store";
import {selectLoader} from "../loader-store/loader.selector";
import {QuixCoreComponentsState} from "../../quix-core-components.reducers";

@Component({
  selector: 'quix-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  loaderSubscription$: Subscription;
  loader$: Observable<any>
  @ViewChild('loader') loader: ElementRef<HTMLDivElement>
  activeLoader: number;

  constructor(
    private store: Store<QuixCoreComponentsState>
  ) {

  }

  ngOnInit(): void {
    this.observeLoader()
  }

  observeLoader() {
    this.loader$ = this.store.pipe(select(selectLoader))
    this.loaderSubscription$ = this.loader$.subscribe(
      loaderNumber => {
        this.activeLoader = loaderNumber
      })
  }

  ngOnDestroy() {
    if (this.loaderSubscription$) {
      this.loaderSubscription$.unsubscribe()
    }
  }
}
