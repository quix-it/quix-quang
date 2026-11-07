import { ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangLoaderService } from './loader.service'

import { QuangLoaderComponent } from './loader.component'

describe('QuangLoaderComponent', () => {
  let component: QuangLoaderComponent
  let fixture: ComponentFixture<QuangLoaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuangLoaderComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(QuangLoaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('showLoader', () => {
    let loaderService: QuangLoaderService

    beforeEach(() => {
      vi.useFakeTimers()
      loaderService = TestBed.inject(QuangLoaderService)
      fixture.componentRef.setInput('showAtLeastFor', 500)
      fixture.detectChanges()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should hide the loader as soon as a load longer than showAtLeastFor ends', () => {
      loaderService.show()
      fixture.detectChanges()
      expect(component.showLoader()).toBe(true)

      vi.advanceTimersByTime(5000)
      loaderService.hide()
      fixture.detectChanges()

      expect(component.showLoader()).toBe(false)
    })

    it('should keep the loader visible until showAtLeastFor has elapsed when the load is shorter', () => {
      loaderService.show()
      fixture.detectChanges()

      vi.advanceTimersByTime(100)
      loaderService.hide()
      fixture.detectChanges()
      expect(component.showLoader()).toBe(true)

      vi.advanceTimersByTime(399)
      expect(component.showLoader()).toBe(true)

      vi.advanceTimersByTime(1)
      expect(component.showLoader()).toBe(false)
    })
  })
})
