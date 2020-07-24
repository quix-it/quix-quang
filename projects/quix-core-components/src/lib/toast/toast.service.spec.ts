import { TestBed } from '@angular/core/testing';
import {QuixToastService} from "./toast.service";



describe('ToastService', () => {
  let service: QuixToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuixToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
