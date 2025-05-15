# Quang Translation

Quang Translation is a wrapper around `@jsverse/transloco` that implements common features for internationalization (i18n) in Angular projects.

## Overview

This package provides:
- A translation loader service for loading translation files
- Providers for configuring translation behavior
- A translation service for runtime translation management
- Translation tokens for use throughout your project

## QuangTranslationLoaderService

[`QuangTranslationLoaderService`](./translation-loader.service.ts) loads translation files dynamically and integrates with Transloco.

## Translation Providers

Translation providers offer a configurable setup for i18n using the `@jsverse/transloco` library. See [`translation-providers.ts`](./translation-providers.ts) for usage examples and configuration options.

## QuangTranslationService

[`QuangTranslationService`](./translation.service.ts) manages translations at runtime, leveraging `@jsverse/transloco` for core translation features. It provides methods for switching languages, retrieving translations, and more.

## Translation Tokens

[`translations.tokens.ts`](./translations.tokens.ts) includes a set of injectable tokens for customizing and extending translation behavior in your project.

## Usage

Refer to the linked files above for implementation details and usage examples. For most applications, you will:
- Register the translation providers in your app module
- Use `QuangTranslationService` for runtime translation management
- Use the provided tokens and loader service as needed for advanced scenarios
