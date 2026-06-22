import { HttpHeaders, HttpResponse } from '@angular/common/http'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { downloadFile, handleDownload } from './download'

describe('download utilities', () => {
  let mockAnchor: {
    href: string
    download: string
    click: ReturnType<typeof vi.fn>
    remove: ReturnType<typeof vi.fn>
  }
  let createElementSpy: ReturnType<typeof vi.spyOn>
  let createObjectURLSpy: ReturnType<typeof vi.spyOn>
  let revokeObjectURLSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    mockAnchor = {
      href: '',
      download: '',
      click: vi.fn(),
      remove: vi.fn(),
    }

    createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue(mockAnchor as unknown as HTMLAnchorElement)
    createObjectURLSpy = vi.spyOn(window.URL, 'createObjectURL').mockReturnValue('blob:http://localhost/mock-url')
    revokeObjectURLSpy = vi.spyOn(window.URL, 'revokeObjectURL').mockImplementation(() => undefined)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('downloadFile', () => {
    it('should create an anchor element and trigger download', () => {
      const file = new File(['test content'], 'test.txt', { type: 'text/plain' })
      const filename = 'download.txt'

      downloadFile(file, filename)

      expect(createElementSpy).toHaveBeenCalledWith('a')
      expect(createObjectURLSpy).toHaveBeenCalledWith(file)
      expect(mockAnchor.href).toBe('blob:http://localhost/mock-url')
      expect(mockAnchor.download).toBe(filename)
      expect(mockAnchor.click).toHaveBeenCalled()
      expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:http://localhost/mock-url')
      expect(mockAnchor.remove).toHaveBeenCalled()
    })

    it('should handle different file types', () => {
      const pdfContent = new Uint8Array([0x25, 0x50, 0x44, 0x46]) // PDF magic bytes
      const file = new File([pdfContent], 'document.pdf', { type: 'application/pdf' })
      const filename = 'report.pdf'

      downloadFile(file, filename)

      expect(createObjectURLSpy).toHaveBeenCalledWith(file)
      expect(mockAnchor.download).toBe(filename)
      expect(mockAnchor.click).toHaveBeenCalled()
    })

    it('should handle empty file', () => {
      const file = new File([], 'empty.txt', { type: 'text/plain' })
      const filename = 'empty.txt'

      downloadFile(file, filename)

      expect(createObjectURLSpy).toHaveBeenCalledWith(file)
      expect(mockAnchor.click).toHaveBeenCalled()
    })
  })

  describe('handleDownload', () => {
    it('should extract filename from content-disposition header', () => {
      const blob = new Blob(['test content'], { type: 'text/plain' })
      const headers = new HttpHeaders({
        'content-disposition': 'attachment; filename="report.xlsx"',
        'content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const response = new HttpResponse({ body: blob, headers })

      handleDownload(response)

      expect(mockAnchor.download).toBe('report.xlsx')
      expect(mockAnchor.click).toHaveBeenCalled()
    })

    it('should extract filename without quotes', () => {
      const blob = new Blob(['test content'], { type: 'text/plain' })
      const headers = new HttpHeaders({
        'content-disposition': 'attachment; filename=report.xlsx',
        'content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const response = new HttpResponse({ body: blob, headers })

      handleDownload(response)

      expect(mockAnchor.download).toBe('report.xlsx')
    })

    it('should use default filename with default extension when content-disposition is missing', () => {
      const blob = new Blob(['test content'], { type: 'text/plain' })
      const headers = new HttpHeaders({
        'content-type': 'text/plain',
      })
      const response = new HttpResponse({ body: blob, headers })

      vi.spyOn(Date.prototype, 'getTime').mockReturnValue(1234567890)

      handleDownload(response)

      expect(mockAnchor.download).toMatch(/^download-\d+\.xls$/)
    })

    it('should use custom default extension when content-disposition is missing', () => {
      const blob = new Blob(['test content'], { type: 'text/plain' })
      const headers = new HttpHeaders({
        'content-type': 'text/plain',
      })
      const response = new HttpResponse({ body: blob, headers })

      vi.spyOn(Date.prototype, 'getTime').mockReturnValue(1234567890)

      handleDownload(response, 'pdf')

      expect(mockAnchor.download).toMatch(/^download-\d+\.pdf$/)
    })

    it('should throw error when body is null', () => {
      const headers = new HttpHeaders({
        'content-disposition': 'attachment; filename="report.xlsx"',
      })
      const response = new HttpResponse({ body: null, headers })

      expect(() => handleDownload(response as unknown as HttpResponse<Blob>)).toThrow('No body')
    })

    it('should use blob as content-type fallback', () => {
      const blob = new Blob(['test content'])
      const headers = new HttpHeaders({
        'content-disposition': 'attachment; filename="file.bin"',
      })
      const response = new HttpResponse({ body: blob, headers })

      // We can't directly check File constructor args, but we verify the flow completes
      handleDownload(response)

      expect(mockAnchor.click).toHaveBeenCalled()
    })

    it('should handle content-disposition with single quotes', () => {
      const blob = new Blob(['test content'], { type: 'text/plain' })
      const headers = new HttpHeaders({
        'content-disposition': "attachment; filename='report.xlsx'",
        'content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const response = new HttpResponse({ body: blob, headers })

      handleDownload(response)

      expect(mockAnchor.download).toBe('report.xlsx')
    })

    it('should handle complex content-disposition header', () => {
      const blob = new Blob(['test content'], { type: 'text/plain' })
      const headers = new HttpHeaders({
        'content-disposition': 'attachment; filename="my-report_2024.xlsx"; size=1234',
        'content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const response = new HttpResponse({ body: blob, headers })

      handleDownload(response)

      expect(mockAnchor.download).toBe('my-report_2024.xlsx')
    })
  })
})
