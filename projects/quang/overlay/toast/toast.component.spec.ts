import { ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangToastComponent } from './toast.component'

describe('QuangToastComponent', () => {
  let component: QuangToastComponent
  let fixture: ComponentFixture<QuangToastComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuangToastComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(QuangToastComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
