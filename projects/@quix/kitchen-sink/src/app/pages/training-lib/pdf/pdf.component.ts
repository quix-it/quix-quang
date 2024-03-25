import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'

import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { TDocumentDefinitions } from 'pdfmake/interfaces'
import { Observable } from 'rxjs'

pdfMake.vfs = pdfFonts.pdfMake.vfs

@Component({
  selector: 'ks-pdf',
  templateUrl: './pdf.component.html',
  styles: []
})
export class PdfComponent {
  file: TDocumentDefinitions = {
    header: 'simple text',
    footer: {
      columns: ['Left part', { text: 'Right part', alignment: 'right' }]
    },
    content: []
  }

  constructor(private readonly http: HttpClient) {}

  create(): void {
    this.prepareImageForPdf().subscribe((image) => {
      this.file.content = [
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 100, '*'],

            body: [
              ['First', 'Second', 'Third', 'The last one'],
              ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
              [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4']
            ]
          }
        },
        'Bulleted list example:',
        {
          ul: ['Item 1', 'Item 2', 'Item 3', { text: 'Item 4', bold: true }]
        },
        'Numbered list example:',
        {
          ol: ['Item 1', 'Item 2', 'Item 3']
        },
        { qr: 'text in QR' },
        {
          image,
          width: 150,
          height: 150
        }
      ]
      pdfMake.createPdf(this.file).download()
    })
  }

  prepareImageForPdf(): Observable<any> {
    return new Observable((observer) => {
      this.http.get('https://picsum.photos/200/300', { responseType: 'blob' }).subscribe((image) => {
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onload = () => {
          observer.next(reader.result)
          observer.complete()
        }
      })
    })
  }
}
