import { TestBed } from '@angular/core/testing';
import {QuixBottomSheetService} from "./bottom-sheet.service";



describe('BottomSheetService', () => {
  let service: QuixBottomSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuixBottomSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
