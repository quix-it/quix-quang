import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { QuangInputEmailComponent } from './input-email.component'

describe('InputEmailComponent', () => {
  let component: QuangInputEmailComponent
  let fixture: ComponentFixture<QuangInputEmailComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangInputEmailComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangInputEmailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
