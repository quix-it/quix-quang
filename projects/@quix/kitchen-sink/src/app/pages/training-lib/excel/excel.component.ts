import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'

import { Workbook } from 'exceljs'
import * as fs from 'file-saver'
import { Observable } from 'rxjs'

@Component({
  selector: 'ks-excel',
  templateUrl: './excel.component.html',
  styles: []
})
export class ExcelComponent {
  title = 'Car Sell Report'
  header = ['Year', 'Month', 'Make', 'Model', 'Quantity', 'Pct']
  data = [
    [2007, 1, 'Volkswagen ', 'Volkswagen Passat', 1267, 10],
    [2007, 1, 'Toyota ', 'Toyota Rav4', 819, 6.5],
    [2007, 1, 'Toyota ', 'Toyota Avensis', 787, 6.2],
    [2007, 1, 'Volkswagen ', 'Volkswagen Golf', 720, 5.7],
    [2007, 1, 'Toyota ', 'Toyota Corolla', 691, 5.4]
  ]

  constructor(private readonly http: HttpClient) {}

  create(): void {
    this.prepareImageForExcel().subscribe((image) => {
      const workbook = new Workbook()
      const worksheet = workbook.addWorksheet('Car Data')
      const titleRow = worksheet.addRow([this.title])
      titleRow.font = {
        name: 'Comic Sans MS',
        family: 4,
        size: 16,
        underline: 'double',
        bold: true
      }
      const headerRow = worksheet.addRow(this.header)
      headerRow.eachCell((cell: any, number: any) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFFF00' },
          bgColor: { argb: 'FF0000FF' }
        }
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      })
      worksheet.addRow([])
      worksheet.addRows(this.data)
      this.data.forEach((d) => {
        const row = worksheet.addRow(d)
        const qty = row.getCell(5)
        let color = 'FF99FF99'
        if (+(qty as any).value < 500) {
          color = 'FF9999'
        }
        qty.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: color }
        }
      })
      const logo = workbook.addImage({
        base64: image,
        extension: 'png'
      })
      worksheet.addImage(logo, 'E1:F3')
      workbook.xlsx.writeBuffer().then((value: any) => {
        const blob = new Blob([value], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        fs.saveAs(blob, 'CarData.xlsx')
      })
    })
  }

  prepareImageForExcel(): Observable<string> {
    return new Observable((observer) => {
      this.http.get('https://picsum.photos/200/300', { responseType: 'blob' }).subscribe((image) => {
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onload = () => {
          observer.next(reader.result as string)
          observer.complete()
        }
      })
    })
  }
}
