import { ComponentFixture, TestBed } from '@angular/core/testing'

import { VconsoleComponent } from './vconsole.component'

describe('VconsoleComponent', () => {
  let component: VconsoleComponent
  let fixture: ComponentFixture<VconsoleComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VconsoleComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(VconsoleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
