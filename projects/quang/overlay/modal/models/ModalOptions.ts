import { ModalAnimationMode } from './ModalAnimationMode'

export interface ModalOptions {
  position: 'right' | 'left' | 'center'
  height?: string
  width?: string
  padding?: string
  containerClass?: string
  animationMode?: ModalAnimationMode
  backgroundColor?: string
  showBackdrop?: boolean
}
