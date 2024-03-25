import { ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangWysiwygViewComponent } from './wysiwyg-view.component'

describe('TextViewComponent', () => {
  let component: QuangWysiwygViewComponent
  let fixture: ComponentFixture<QuangWysiwygViewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuangWysiwygViewComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangWysiwygViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
