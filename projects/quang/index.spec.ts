import { TestBed } from '@angular/core/testing'

import { QUANG_CONFIG, QuangConfig, provideQuangConfig } from './index'

describe('provideQuangConfig', () => {
  it('should provide QUANG_CONFIG with the configuration passed to provideQuangConfig', () => {
    const config: QuangConfig = { verbose: true, baseHref: '/base/', overlayUsePopover: true }

    TestBed.configureTestingModule({
      providers: [provideQuangConfig(config)],
    })

    expect(TestBed.inject(QUANG_CONFIG, null, { optional: true })).toEqual(config)
  })
})
