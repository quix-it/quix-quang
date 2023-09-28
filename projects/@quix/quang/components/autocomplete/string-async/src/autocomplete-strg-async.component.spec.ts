import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangAutocompleteStringAsyncComponent } from './autocomplete-strg-async.component'

describe('AutocompleteStrgAsyncComponent', () => {
  let component: QuangAutocompleteStringAsyncComponent
  let fixture: ComponentFixture<QuangAutocompleteStringAsyncComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangAutocompleteStringAsyncComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangAutocompleteStringAsyncComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
