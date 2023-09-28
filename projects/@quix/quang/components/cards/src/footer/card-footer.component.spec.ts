import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangCardFooterComponent } from './card-footer.component'

describe('CardFooterComponent', () => {
  let component: QuangCardFooterComponent
  let fixture: ComponentFixture<QuangCardFooterComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangCardFooterComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangCardFooterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
