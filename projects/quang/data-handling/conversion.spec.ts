import { describe, expect, it } from 'vitest'

import { base64ToDataUri, blobToBase64, dataUriToBlob } from './conversion'

describe('conversion utilities', () => {
  describe('blobToBase64', () => {
    it('should convert a blob to base64 data URL', async () => {
      const content = 'Hello, World!'
      const blob = new Blob([content], { type: 'text/plain' })

      const result = await blobToBase64(blob)

      expect(result).toBeTypeOf('string')
      expect(result).toContain('data:text/plain;base64,')
    })

    it('should handle empty blob', async () => {
      const blob = new Blob([], { type: 'application/octet-stream' })

      const result = await blobToBase64(blob)

      expect(result).toBeTypeOf('string')
      expect(result).toContain('data:application/octet-stream;base64,')
    })

    it('should handle binary data', async () => {
      const binaryData = new Uint8Array([0, 1, 2, 3, 255])
      const blob = new Blob([binaryData], { type: 'application/octet-stream' })

      const result = await blobToBase64(blob)

      expect(result).toBeTypeOf('string')
      expect(result).toContain('base64,')
    })

    it('should reject on FileReader error', async () => {
      const blob = new Blob(['test'])

      // Mock FileReader to simulate error
      const originalFileReader = global.FileReader
      const mockError = new Error('Read error')

      class MockFileReader {
        onloadend: (() => void) | null = null
        onerror: ((error: Error) => void) | null = null
        result: string | ArrayBuffer | null = null

        readAsDataURL(_blob: Blob) {
          setTimeout(() => {
            if (this.onerror) {
              this.onerror(mockError)
            }
          }, 0)
        }
      }

      global.FileReader = MockFileReader as unknown as typeof FileReader

      await expect(blobToBase64(blob)).rejects.toEqual(mockError)

      global.FileReader = originalFileReader
    })
  })

  describe('base64ToDataUri', () => {
    it('should convert base64 string to data URI with default type', async () => {
      const base64 = 'SGVsbG8sIFdvcmxkIQ=='

      const result = await base64ToDataUri(base64)

      expect(result).toBe('data:application/octet-stream;base64,SGVsbG8sIFdvcmxkIQ==')
    })

    it('should convert base64 string to data URI with custom type', async () => {
      const base64 = 'SGVsbG8sIFdvcmxkIQ=='

      const result = await base64ToDataUri(base64, 'text/plain')

      expect(result).toBe('data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==')
    })

    it('should handle empty base64 string', async () => {
      const result = await base64ToDataUri('')

      expect(result).toBe('data:application/octet-stream;base64,')
    })

    it('should handle image mime type', async () => {
      const base64 = 'iVBORw0KGgo='

      const result = await base64ToDataUri(base64, 'image/png')

      expect(result).toBe('data:image/png;base64,iVBORw0KGgo=')
    })
  })

  describe('dataUriToBlob', () => {
    it('should convert data URI to blob', async () => {
      const dataUri = 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=='

      const result = await dataUriToBlob(dataUri)

      expect(result).toBeDefined()
      expect(result.type).toBe('text/plain')
      expect(result.size).toBeGreaterThan(0)
    })

    it('should preserve blob content', async () => {
      const originalContent = 'Test content'
      const base64 = btoa(originalContent)
      const dataUri = `data:text/plain;base64,${base64}`

      const result = await dataUriToBlob(dataUri)
      const text = await result.text()

      expect(text).toBe(originalContent)
    })

    it('should handle binary data URI', async () => {
      const dataUri = 'data:application/octet-stream;base64,AAECAw=='

      const result = await dataUriToBlob(dataUri)

      expect(result).toBeDefined()
      expect(result.type).toBe('application/octet-stream')

      const arrayBuffer = await result.arrayBuffer()
      const bytes = new Uint8Array(arrayBuffer)
      expect(Array.from(bytes)).toEqual([0, 1, 2, 3])
    })

    it('should handle image data URI', async () => {
      // Minimal valid PNG data URI
      const dataUri = 'data:image/png;base64,iVBORw0KGgo='

      const result = await dataUriToBlob(dataUri)

      expect(result).toBeDefined()
      expect(result.type).toBe('image/png')
    })
  })

  describe('round-trip conversions', () => {
    it('should preserve content through blob -> base64 -> dataUri -> blob', async () => {
      const originalContent = 'Round trip test content!'
      const originalBlob = new Blob([originalContent], { type: 'text/plain' })

      // Blob -> Base64 data URL (blobToBase64 already returns a data URL)
      const dataUrl = (await blobToBase64(originalBlob)) as string

      // Data URL -> Blob
      const resultBlob = await dataUriToBlob(dataUrl)
      const resultText = await resultBlob.text()

      expect(resultText).toBe(originalContent)
    })
  })
})
