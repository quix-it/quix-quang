import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuixCardFooterComponent } from './quix-card-footer.component'

describe('QuixCardFooterComponent', () => {
  let component: QuixCardFooterComponent
  let fixture: ComponentFixture<QuixCardFooterComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuixCardFooterComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuixCardFooterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
