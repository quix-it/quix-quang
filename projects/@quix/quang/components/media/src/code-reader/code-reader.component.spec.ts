import { ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangCodeReaderComponent } from './code-reader.component'

describe('CodeReaderComponent', () => {
  let component: QuangCodeReaderComponent
  let fixture: ComponentFixture<QuangCodeReaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuangCodeReaderComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangCodeReaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
