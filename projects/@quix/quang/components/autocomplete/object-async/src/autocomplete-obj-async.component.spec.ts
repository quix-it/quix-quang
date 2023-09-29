import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { QuangAutocompleteObjectAsyncComponent } from './autocomplete-obj-async.component'

describe('AutocompleteObjAsyncComponent', () => {
  let component: QuangAutocompleteObjectAsyncComponent
  let fixture: ComponentFixture<QuangAutocompleteObjectAsyncComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangAutocompleteObjectAsyncComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangAutocompleteObjectAsyncComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
