import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AutocompleteStrgComponent } from './autocomplete-strg.component'

describe('AutocompleteStrgComponent', () => {
  let component: AutocompleteStrgComponent
  let fixture: ComponentFixture<AutocompleteStrgComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutocompleteStrgComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteStrgComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
