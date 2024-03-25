import { TestBed } from '@angular/core/testing';
import {QuangKeycloakService} from "./quang-keycloak.service";



describe('QuangKeycloakService', () => {
  let service: QuangKeycloakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuangKeycloakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
