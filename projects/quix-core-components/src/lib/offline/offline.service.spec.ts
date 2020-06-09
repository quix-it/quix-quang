import { TestBed } from '@angular/core/testing';
import {QuixOfflineService} from "./offline.service";

describe('OfflineService', () => {
  let service: QuixOfflineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuixOfflineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
