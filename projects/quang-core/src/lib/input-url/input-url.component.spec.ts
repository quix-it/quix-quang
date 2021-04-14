import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputUrlComponent } from './input-url.component';

describe('InputUrlComponent', () => {
  let component: InputUrlComponent;
  let fixture: ComponentFixture<InputUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
