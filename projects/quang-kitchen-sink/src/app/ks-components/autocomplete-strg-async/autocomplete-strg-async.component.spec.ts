import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AutocompleteStrgAsyncComponent } from './autocomplete-strg-async.component'

describe('AutocompleteStrgAsyncComponent', () => {
  let component: AutocompleteStrgAsyncComponent
  let fixture: ComponentFixture<AutocompleteStrgAsyncComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutocompleteStrgAsyncComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteStrgAsyncComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
