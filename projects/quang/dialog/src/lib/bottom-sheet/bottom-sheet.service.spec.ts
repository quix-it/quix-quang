import { TestBed } from '@angular/core/testing'
import { QuangBottomSheetService } from './bottom-sheet.service'

describe('BottomSheetService', () => {
  let service: QuangBottomSheetService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(QuangBottomSheetService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
