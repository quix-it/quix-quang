import { provideHttpClient } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

import { from } from 'rxjs'
import { describe, expect, it } from 'vitest'

import { QuangTranslationLoaderService } from './translation-loader.service'

describe('QuangTranslationLoaderService', () => {
  it('should be defined', () => {
    expect(QuangTranslationLoaderService).toBeDefined()
  })

  describe('getTranslation', () => {
    it('falls back to ./assets/i18n/<lang>.json when TRANSLATIONS_BASE_PATH is not provided', () => {
      TestBed.configureTestingModule({
        providers: [QuangTranslationLoaderService, provideHttpClient(), provideHttpClientTesting()],
      })

      expect(() => TestBed.inject(QuangTranslationLoaderService)).not.toThrow()

      const httpTesting = TestBed.inject(HttpTestingController)
      from(TestBed.inject(QuangTranslationLoaderService).getTranslation('it')).subscribe()
      httpTesting.expectOne('./assets/i18n/it.json')
      httpTesting.verify()
    })
  })
})
