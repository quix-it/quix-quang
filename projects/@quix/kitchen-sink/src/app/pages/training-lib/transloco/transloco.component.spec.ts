import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TranslocoComponent } from './transloco.component'

describe('TranslocoComponent', () => {
  let component: TranslocoComponent
  let fixture: ComponentFixture<TranslocoComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranslocoComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslocoComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
