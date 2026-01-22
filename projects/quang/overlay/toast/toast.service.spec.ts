import { QuangToastService } from './toast.service'

describe('QuangToastService', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('should open and auto-close a toast after timing', () => {
    vi.useFakeTimers()

    const service = new QuangToastService()
    expect(service.isShowing()).toBe(false)

    service.openToast({
      type: 'success',
      position: 'top-right',
      timing: 1000,
      text: 'Hello',
    })

    expect(service.isShowing()).toBe(true)
    expect(service.count()).toBe(1)
    expect(service.currentToast()).not.toBeNull()

    vi.advanceTimersByTime(1000)

    expect(service.isShowing()).toBe(false)
    expect(service.currentToast()).toBeNull()
    expect(service.count()).toBe(0)
  })

  it('should keep only one toast when opened multiple times and reset timeout', () => {
    vi.useFakeTimers()

    const service = new QuangToastService()
    service.openToast({
      type: 'success',
      position: 'top-right',
      timing: 1000,
      text: 'First',
    })

    expect(service.count()).toBe(1)
    expect(service.currentToast()?.text).toBe('First')

    vi.advanceTimersByTime(500)

    service.openToast({
      type: 'warning',
      position: 'top-right',
      timing: 1000,
      text: 'Second',
    })

    expect(service.count()).toBe(1)
    expect(service.currentToast()?.text).toBe('Second')

    // Should not auto-close at the original first toast deadline
    vi.advanceTimersByTime(500)
    expect(service.isShowing()).toBe(true)

    // Should auto-close after the second toast timing
    vi.advanceTimersByTime(500)
    expect(service.isShowing()).toBe(false)
  })
})
