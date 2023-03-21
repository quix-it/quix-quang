import { type AfterViewInit, Component, ViewChild } from '@angular/core'
import { MatSort } from '@angular/material/sort'
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table'

interface PeriodicElement {
  name: string
  position: number
  weight: number
  symbol: string
}

@Component({
  selector: 'ks-data-table',
  templateUrl: './data-table.component.html',
  styles: []
})
export class DataTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol']
  dataSource: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
  ]

  sortDataSource = new MatTableDataSource(this.dataSource)
  @ViewChild(MatSort) sort: MatSort | null = null

  ngAfterViewInit (): void {
    this.sortDataSource.sort = this.sort
  }
}
