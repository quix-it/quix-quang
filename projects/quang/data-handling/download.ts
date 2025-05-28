import { HttpResponse } from '@angular/common/http'

export function downloadFile(file: File, filename: string): void {
  const a = document.createElement('a')
  const url = window.URL.createObjectURL(file)
  a.href = url
  a.download = filename
  a.click()
  window.URL.revokeObjectURL(url)
  a.remove()
}

export function handleDownload(response: HttpResponse<Blob>, defaultExtension = 'xls'): void {
  const { body, headers } = response
  if (!body) throw new Error('No body')
  let filename: string
  try {
    const contentDisposition = headers.get('content-disposition') ?? ''
    const r = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/

    filename = r.exec(contentDisposition)![1]
    filename = filename.replace(/['"]/g, '')
  } catch (_error) {
    filename = `download-${new Date().getTime()}.${defaultExtension}`
  }
  const file = new File([body], filename, {
    type: headers.get('content-type') ?? 'blob',
  })
  downloadFile(file, filename)
}
