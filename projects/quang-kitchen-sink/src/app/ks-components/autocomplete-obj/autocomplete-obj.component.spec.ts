import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AutocompleteObjComponent } from './autocomplete-obj.component'

describe('AutocompleteObjComponent', () => {
  let component: AutocompleteObjComponent
  let fixture: ComponentFixture<AutocompleteObjComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutocompleteObjComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteObjComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
