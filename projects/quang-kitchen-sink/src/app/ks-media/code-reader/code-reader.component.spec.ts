import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CodeReaderComponent } from './code-reader.component'

describe('CodeReaderComponent', () => {
  let component: CodeReaderComponent
  let fixture: ComponentFixture<CodeReaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeReaderComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeReaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
