import { Platform } from '@angular/cdk/platform'
import { DEFAULT_RESIZE_TIME, ViewportScrollPosition } from '@angular/cdk/scrolling'
import { DOCUMENT, Inject, Injectable, NgZone, OnDestroy, Optional } from '@angular/core'

import { Observable, Subject, auditTime } from 'rxjs'

/* eslint-disable */
/**
 * Class cloe of [ViewportRuler](https://github.com/angular/components/blob/master/src/cdk/scrolling/viewport-ruler.ts)
 * To fix the wrong reported size of the viewport on mobile devices with hidden url bars
 * Issues references:
 * https://github.com/angular/components/issues/18890
 * https://github.com/angular/components/issues/27739
 *
 * To use this component provide it instead of `ViewportRuler`
 *
 * @example
 * providers: [
 *   {
 *     provide: ViewportRuler,
 *     useClass: CustomViewportRuler
 *   }
 * ]
 */
@Injectable({ providedIn: 'root' })
export class CustomViewportRuler implements OnDestroy {
  /** Used to reference correct document/window */
  protected _document: Document
  /** Cached viewport dimensions. */
  private _viewportSize: { width: number; height: number } | null = null
  /** Stream of viewport change events. */
  private readonly _change = new Subject<Event>()

  constructor(
    private _platform: Platform,
    ngZone: NgZone,
    @Optional() @Inject(DOCUMENT) document: any
  ) {
    this._document = document

    ngZone.runOutsideAngular(() => {
      if (_platform.isBrowser) {
        const window = this._getWindow()

        // Note that bind the events ourselves, rather than going through something like RxJS's
        // `fromEvent` so that we can ensure that they're bound outside of the NgZone.
        window.addEventListener('resize', this._changeListener)
        window.addEventListener('orientationchange', this._changeListener)
      }

      // Clear the cached position so that the viewport is re-measured next time it is required.
      // We don't need to keep track of the subscription, because it is completed on destroy.
      this.change().subscribe(() => (this._viewportSize = null))
    })
  }

  ngOnDestroy() {
    if (this._platform.isBrowser) {
      const window = this._getWindow()
      window.removeEventListener('resize', this._changeListener)
      window.removeEventListener('orientationchange', this._changeListener)
    }

    this._change.complete()
  }

  /** Returns the viewport's width and height. */
  getViewportSize(): Readonly<{ width: number; height: number }> {
    if (!this._viewportSize) {
      this._updateViewportSize()
    }

    const output = { width: this._viewportSize!.width, height: this._viewportSize!.height }

    // If we're not on a browser, don't cache the size since it'll be mocked out anyway.
    if (!this._platform.isBrowser) {
      this._viewportSize = null!
    }

    return output
  }

  /** Gets a DOMRect for the viewport's bounds. */
  getViewportRect() {
    // Use the document element's bounding rect rather than the window scroll properties
    // (e.g. pageYOffset, scrollY) due to in issue in Chrome and IE where window scroll
    // properties and client coordinates (boundingClientRect, clientX/Y, etc.) are in different
    // conceptual viewports. Under most circumstances these viewports are equivalent, but they
    // can disagree when the page is pinch-zoomed (on devices that support touch).
    // See https://bugs.chromium.org/p/chromium/issues/detail?id=489206#c4
    // We use the documentElement instead of the body because, by default (without a css reset)
    // browsers typically give the document body an 8px margin, which is not included in
    // getBoundingClientRect().
    const scrollPosition = this.getViewportScrollPosition()
    const { width, height } = this.getViewportSize()

    return {
      top: scrollPosition.top,
      left: scrollPosition.left,
      bottom: scrollPosition.top + height,
      right: scrollPosition.left + width,
      height,
      width,
    }
  }

  /** Gets the (top, left) scroll position of the viewport. */
  getViewportScrollPosition(): ViewportScrollPosition {
    // While we can get a reference to the fake document
    // during SSR, it doesn't have getBoundingClientRect.
    if (!this._platform.isBrowser) {
      return { top: 0, left: 0 }
    }

    // The top-left-corner of the viewport is determined by the scroll position of the document
    // body, normally just (scrollLeft, scrollTop). However, Chrome and Firefox disagree about
    // whether `document.body` or `document.documentElement` is the scrolled element, so reading
    // `scrollTop` and `scrollLeft` is inconsistent. However, using the bounding rect of
    // `document.documentElement` works consistently, where the `top` and `left` values will
    // equal negative the scroll position.
    const document = this._document
    const window = this._getWindow()
    const documentElement = document.documentElement!
    const documentRect = documentElement.getBoundingClientRect()

    const top = -documentRect.top || document.body.scrollTop || window.scrollY || documentElement.scrollTop || 0

    const left = -documentRect.left || document.body.scrollLeft || window.scrollX || documentElement.scrollLeft || 0

    return { top, left }
  }

  /**
   * Returns a stream that emits whenever the size of the viewport changes.
   * This stream emits outside of the Angular zone.
   * @param throttleTime Time in milliseconds to throttle the stream.
   */
  change(throttleTime: number = DEFAULT_RESIZE_TIME): Observable<Event> {
    return throttleTime > 0 ? this._change.pipe(auditTime(throttleTime)) : this._change
  }

  /** Event listener that will be used to handle the viewport change events. */
  private _changeListener = (event: Event) => {
    this._change.next(event)
  }

  /** Use defaultView of injected document if available or fallback to global window reference */
  private _getWindow(): Window {
    return this._document.defaultView || window
  }

  /** Updates the cached viewport size. */
  private _updateViewportSize() {
    this._viewportSize = this._platform.isBrowser
      ? { width: document.documentElement.clientWidth, height: document.documentElement.clientHeight }
      : { width: 0, height: 0 }
  }
}
