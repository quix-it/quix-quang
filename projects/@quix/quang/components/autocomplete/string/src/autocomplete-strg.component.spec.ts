import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangAutocompleteStringComponent } from './autocomplete-strg.component'

describe('AutocompleteStrgComponent', () => {
  let component: QuangAutocompleteStringComponent
  let fixture: ComponentFixture<QuangAutocompleteStringComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangAutocompleteStringComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangAutocompleteStringComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
