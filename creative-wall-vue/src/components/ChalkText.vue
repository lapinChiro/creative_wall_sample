<template>
  <div
    ref="textRef"
    class="chalk-text"
    :class="[
      `color-${text.color}`,
      { 
        'dragging': isDragging,
        'focused': isFocused
      }
    ]"
    :style="{
      left: `${currentPosition.x}px`,
      top: `${currentPosition.y}px`,
      transform: `rotate(${text.rotation}deg)`,
      fontSize: `${text.fontSize}em`,
      zIndex: text.zIndex
    }"
    @click="handleClick"
  >
    {{ text.text }}
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDraggable } from '@/composables/useDraggable'
import type { ChalkTextItem, Position } from '@/types'

interface Props {
  text: ChalkTextItem
}

interface Emits {
  (e: 'update-position', position: Position): void
  (e: 'click'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const textRef = ref<HTMLElement | null>(null)
const isFocused = ref(false)
const currentPosition = ref<Position>({ ...props.text.position })

const { isDragging, position } = useDraggable(textRef, {
  onDragStart: () => {
    isFocused.value = true
  },
  onDrag: (pos: Position) => {
    currentPosition.value = pos
    emit('update-position', pos)
  },
  onDragEnd: () => {
    setTimeout(() => {
      isFocused.value = false
    }, 200)
  }
})

const handleClick = () => {
  emit('click')
  isFocused.value = true
  setTimeout(() => {
    isFocused.value = false
  }, 1000)
}

watch(() => props.text.position, (newPos) => {
  if (!isDragging.value) {
    currentPosition.value = { ...newPos }
  }
})
</script>

<style scoped>
.chalk-text {
  position: absolute;
  color: white;
  font-family: 'Klee One', cursive;
  font-weight: 600;
  text-shadow: 
    0 0 5px rgba(255, 255, 255, 0.5),
    0 0 10px rgba(255, 255, 255, 0.3);
  cursor: move;
  z-index: 10;
  opacity: 0.9;
  touch-action: none;
  transition: transform 0.2s, z-index 0.2s;
  animation: fadeIn 0.5s ease-out;
  user-select: none;
}

.chalk-text.color-yellow {
  color: #FFEB3B;
  text-shadow: 
    0 0 5px rgba(255, 235, 59, 0.5),
    0 0 10px rgba(255, 235, 59, 0.3);
}

.chalk-text.color-pink {
  color: #FF4081;
  text-shadow: 
    0 0 5px rgba(255, 64, 129, 0.5),
    0 0 10px rgba(255, 64, 129, 0.3);
}

.chalk-text.color-blue {
  color: #40C4FF;
  text-shadow: 
    0 0 5px rgba(64, 196, 255, 0.5),
    0 0 10px rgba(64, 196, 255, 0.3);
}

.chalk-text.color-green {
  color: #69F0AE;
  text-shadow: 
    0 0 5px rgba(105, 240, 174, 0.5),
    0 0 10px rgba(105, 240, 174, 0.3);
}

.chalk-text.color-white {
  color: white;
  text-shadow: 
    0 0 5px rgba(255, 255, 255, 0.5),
    0 0 10px rgba(255, 255, 255, 0.3);
}

.chalk-text:hover {
  transform: scale(1.05);
}

.chalk-text.dragging {
  opacity: 0.7;
  transform: scale(1.1) !important;
  z-index: 1000 !important;
}

.chalk-text.focused {
  z-index: 500 !important;
  transform: scale(1.08);
  opacity: 1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 0.9;
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .chalk-text {
    font-size: 0.9em;
  }
  
  .chalk-text:active {
    z-index: 600 !important;
    transform: scale(1.15);
  }
}
</style>