import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { QuangWysiwygEditorComponent } from './wysiwyg-editor.component'

describe('TextEditorComponent', () => {
  let component: QuangWysiwygEditorComponent
  let fixture: ComponentFixture<QuangWysiwygEditorComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangWysiwygEditorComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangWysiwygEditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
