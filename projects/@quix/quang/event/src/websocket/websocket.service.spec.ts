import { TestBed } from '@angular/core/testing';

import { QuangWebsocketService } from './websocket.service';

describe('QuangWebsocketService', () => {
  let service: QuangWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuangWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
