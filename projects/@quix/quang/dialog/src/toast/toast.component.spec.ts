import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { QuangToastComponent } from './toast.component'

describe('QuangToastComponent', () => {
  let component: QuangToastComponent
  let fixture: ComponentFixture<QuangToastComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangToastComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangToastComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
