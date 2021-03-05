import { TestBed } from '@angular/core/testing';
import {QuixEventSourceService} from './event-source.service';

describe('QuixEventSourceService', () => {
  let service: QuixEventSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuixEventSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
