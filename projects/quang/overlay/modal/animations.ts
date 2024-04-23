import { animate, style } from '@angular/animations'

export const fromRightToLeft = [style({ translate: '100%' }), animate('400ms ease-out', style({ translate: 0 }))]
export const fromLeftToRight = [style({ translate: 0 }), animate('400ms ease', style({ translate: '100%' }))]
