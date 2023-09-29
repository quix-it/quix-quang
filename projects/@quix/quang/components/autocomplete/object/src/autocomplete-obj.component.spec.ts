import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { QuangAutocompleteObjectComponent } from './autocomplete-obj.component'

describe('AutocompleteObjComponent', () => {
  let component: QuangAutocompleteObjectComponent
  let fixture: ComponentFixture<QuangAutocompleteObjectComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangAutocompleteObjectComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangAutocompleteObjectComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
