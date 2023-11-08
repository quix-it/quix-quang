import { defineLocale } from 'ngx-bootstrap/chronos'
import { BsLocaleService } from 'ngx-bootstrap/datepicker'
import * as locales from 'ngx-bootstrap/locale'

export function localeSetup(locale: string, localeService: BsLocaleService) {
  const targetLocale = locale.toLowerCase()
  const defaultLocale = 'en-gb'

  let localeBootstrap: any
  let defaultLocaleBootstrap: any

  for (const locale in locales) {
    if (locales[locale].abbr.toLowerCase() === targetLocale) {
      localeBootstrap = locales[locale]
    }

    if (locales[locale].abbr.toLowerCase() === defaultLocale) {
      defaultLocaleBootstrap = locales[locale]
    }
  }

  if (localeBootstrap) {
    defineLocale(targetLocale, localeBootstrap)
    localeService.use(targetLocale)
  } else if (defaultLocaleBootstrap) {
    defineLocale(targetLocale, defaultLocaleBootstrap)
    localeService.use(targetLocale)
  }
}
