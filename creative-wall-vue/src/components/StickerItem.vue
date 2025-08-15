<template>
  <div
    ref="stickerRef"
    class="sticker"
    :class="[
      `sticker-${sticker.size}`,
      { 
        'dragging': isDragging,
        'focused': isFocused
      }
    ]"
    :style="{
      left: `${currentPosition.x}px`,
      top: `${currentPosition.y}px`,
      transform: `rotate(${sticker.rotation}deg)`,
      zIndex: sticker.zIndex
    }"
    @click="handleClick"
  >
    <img 
      :src="sticker.url" 
      :alt="sticker.title"
      :title="sticker.title"
      @error="handleImageError"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useDraggable } from '@/composables/useDraggable'
import type { StickerItem, Position } from '@/types'

interface Props {
  sticker: StickerItem
}

interface Emits {
  (e: 'update-position', position: Position): void
  (e: 'click'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const stickerRef = ref<HTMLElement | null>(null)
const isFocused = ref(false)
const currentPosition = ref<Position>({ ...props.sticker.position })

const { isDragging, position } = useDraggable(stickerRef, {
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

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="150"%3E%3Crect width="150" height="150" fill="%23444" rx="10"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="14" fill="%23999" text-anchor="middle" dy=".3em"%3EError%3C/text%3E%3C/svg%3E'
}

watch(() => props.sticker.position, (newPos) => {
  if (!isDragging.value) {
    currentPosition.value = { ...newPos }
  }
})
</script>

<style scoped>
.sticker {
  position: absolute;
  cursor: move;
  transition: transform 0.2s, filter 0.2s, z-index 0.2s;
  filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.5));
  touch-action: none;
  animation: fadeIn 0.5s ease-out;
}

.sticker:hover {
  transform: scale(1.05) rotate(2deg);
  filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.7));
}

.sticker.dragging {
  opacity: 0.7;
  transform: scale(1.1) !important;
  z-index: 1000 !important;
}

.sticker.focused {
  z-index: 500 !important;
  transform: scale(1.08);
  filter: drop-shadow(0 15px 35px rgba(0, 0, 0, 0.8));
}

.sticker img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  pointer-events: none;
  user-select: none;
}

.sticker-size-1 { width: 120px; height: 120px; }
.sticker-size-2 { width: 150px; height: 150px; }
.sticker-size-3 { width: 180px; height: 180px; }
.sticker-size-4 { width: 100px; height: 100px; }

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .sticker-size-1 { width: 90px; height: 90px; }
  .sticker-size-2 { width: 110px; height: 110px; }
  .sticker-size-3 { width: 130px; height: 130px; }
  .sticker-size-4 { width: 75px; height: 75px; }
  
  .sticker:active {
    z-index: 600 !important;
    transform: scale(1.15);
  }
  
  .sticker {
    opacity: 0.95;
  }
  
  .sticker.focused {
    opacity: 1;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .sticker-size-1 { width: 100px; height: 100px; }
  .sticker-size-2 { width: 130px; height: 130px; }
  .sticker-size-3 { width: 150px; height: 150px; }
  .sticker-size-4 { width: 90px; height: 90px; }
}
</style>