import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { QuixToastComponent } from './toast.component'

describe('QuixToastComponent', () => {
  let component: QuixToastComponent
  let fixture: ComponentFixture<QuixToastComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuixToastComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuixToastComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
