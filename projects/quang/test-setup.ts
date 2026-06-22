import '@angular/compiler'
import { getTestBed } from '@angular/core/testing'
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing'

import '@analogjs/vitest-angular/setup-zone'

// Polyfill ResizeObserver for jsdom
if (typeof ResizeObserver === 'undefined') {
  global.ResizeObserver = class ResizeObserver {
    observe(): void {
      return
    }
    unobserve(): void {
      return
    }
    disconnect(): void {
      return
    }
  }
}

// Mock scrollIntoView for jsdom (not implemented in JSDOM)
if (typeof Element.prototype.scrollIntoView === 'undefined') {
  Element.prototype.scrollIntoView = function (): void {
    return
  }
}

getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
