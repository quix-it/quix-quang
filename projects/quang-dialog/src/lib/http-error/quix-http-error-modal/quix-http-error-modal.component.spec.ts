import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuixHttpErrorModalComponent } from './quix-http-error-modal.component';

describe('QuixHttpErrorModalComponent', () => {
  let component: QuixHttpErrorModalComponent;
  let fixture: ComponentFixture<QuixHttpErrorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuixHttpErrorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuixHttpErrorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
