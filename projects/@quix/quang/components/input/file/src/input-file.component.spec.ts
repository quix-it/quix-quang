import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { QuangInputFileComponent } from './input-file.component'

describe('InputFileComponent', () => {
  let component: QuangInputFileComponent
  let fixture: ComponentFixture<QuangInputFileComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangInputFileComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangInputFileComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
