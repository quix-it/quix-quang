import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowSelectorComponent } from './row-selector.component';

describe('RowSelectorComponent', () => {
  let component: RowSelectorComponent;
  let fixture: ComponentFixture<RowSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
