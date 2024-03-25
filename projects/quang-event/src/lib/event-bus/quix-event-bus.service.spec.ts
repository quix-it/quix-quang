import { TestBed } from '@angular/core/testing';

import { QuixEventBusService } from './quix-event-bus.service';

describe('QuixEventBusService', () => {
  let service: QuixEventBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuixEventBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
