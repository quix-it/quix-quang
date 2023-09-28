import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangInputUrlComponent } from './input-url.component'

describe('InputUrlComponent', () => {
  let component: QuangInputUrlComponent
  let fixture: ComponentFixture<QuangInputUrlComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangInputUrlComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangInputUrlComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
