import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { AutocompleteObjAsyncComponent } from './autocomplete-obj-async.component'

describe('AutocompleteObjAsyncComponent', () => {
  let component: AutocompleteObjAsyncComponent
  let fixture: ComponentFixture<AutocompleteObjAsyncComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteObjAsyncComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteObjAsyncComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
