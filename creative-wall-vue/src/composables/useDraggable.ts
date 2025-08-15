import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import type { Position } from '@/types'

export interface UseDraggableOptions {
  onDragStart?: (e: MouseEvent | TouchEvent) => void
  onDrag?: (position: Position) => void
  onDragEnd?: () => void
  boundary?: {
    minX: number
    maxX: number
    minY: number
    maxY: number
  }
}

export function useDraggable(
  elementRef: Ref<HTMLElement | null>,
  options: UseDraggableOptions = {}
) {
  const isDragging = ref(false)
  const position = ref<Position>({ x: 0, y: 0 })
  const offset = ref<Position>({ x: 0, y: 0 })
  let currentTouch: number | null = null

  const updatePosition = (clientX: number, clientY: number) => {
    const newX = clientX - offset.value.x
    const newY = clientY - offset.value.y

    if (options.boundary) {
      position.value = {
        x: Math.max(options.boundary.minX, Math.min(newX, options.boundary.maxX)),
        y: Math.max(options.boundary.minY, Math.min(newY, options.boundary.maxY))
      }
    } else {
      position.value = { x: newX, y: newY }
    }

    if (options.onDrag) {
      options.onDrag(position.value)
    }
  }

  const handleMouseDown = (e: MouseEvent) => {
    if (!elementRef.value) return
    
    isDragging.value = true
    const rect = elementRef.value.getBoundingClientRect()
    offset.value = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }

    if (options.onDragStart) {
      options.onDragStart(e)
    }

    e.preventDefault()
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.value) return
    updatePosition(e.clientX, e.clientY)
  }

  const handleMouseUp = () => {
    if (!isDragging.value) return
    
    isDragging.value = false
    if (options.onDragEnd) {
      options.onDragEnd()
    }
  }

  const handleTouchStart = (e: TouchEvent) => {
    if (!elementRef.value || e.touches.length === 0) return
    
    isDragging.value = true
    currentTouch = e.touches[0].identifier
    const rect = elementRef.value.getBoundingClientRect()
    offset.value = {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    }

    if (options.onDragStart) {
      options.onDragStart(e)
    }

    e.preventDefault()
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.value || currentTouch === null) return
    
    const touch = Array.from(e.touches).find(t => t.identifier === currentTouch)
    if (!touch) return
    
    updatePosition(touch.clientX, touch.clientY)
    e.preventDefault()
  }

  const handleTouchEnd = () => {
    if (!isDragging.value) return
    
    isDragging.value = false
    currentTouch = null
    if (options.onDragEnd) {
      options.onDragEnd()
    }
  }

  onMounted(() => {
    if (!elementRef.value) return

    // Mouse events
    elementRef.value.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    // Touch events
    elementRef.value.addEventListener('touchstart', handleTouchStart, { passive: false })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)
  })

  onUnmounted(() => {
    // Cleanup mouse events
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)

    // Cleanup touch events
    document.removeEventListener('touchmove', handleTouchMove)
    document.removeEventListener('touchend', handleTouchEnd)
  })

  return {
    isDragging,
    position
  }
}