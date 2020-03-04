import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuixHttpErrorComponent } from './quix-http-error.component';

describe('QuixHttpErrorComponent', () => {
  let component: QuixHttpErrorComponent;
  let fixture: ComponentFixture<QuixHttpErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuixHttpErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuixHttpErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
