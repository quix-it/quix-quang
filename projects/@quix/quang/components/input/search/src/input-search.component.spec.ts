import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangInputSearchComponent } from './input-search.component'

describe('InputSearchComponent', () => {
  let component: QuangInputSearchComponent
  let fixture: ComponentFixture<QuangInputSearchComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangInputSearchComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangInputSearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
