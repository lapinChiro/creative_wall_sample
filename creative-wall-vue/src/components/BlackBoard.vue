<template>
  <div class="blackboard" ref="blackboardRef">
    <div class="logo-watermark">🎨 Creative Wall</div>
    <div 
      class="scroll-area" 
      ref="scrollAreaRef"
      :class="{ 'mobile-scroll': isMobile }"
    >
      <TransitionGroup name="fade">
        <StickerItem
          v-for="sticker in stickers"
          :key="sticker.id"
          :sticker="sticker"
          @update-position="(pos) => $emit('update-sticker-position', sticker.id, pos)"
          @click="() => handleItemClick('sticker', sticker.id)"
        />
        <ChalkText
          v-for="text in texts"
          v-show="showTexts"
          :key="text.id"
          :text="text"
          @update-position="(pos) => $emit('update-text-position', text.id, pos)"
          @click="() => handleItemClick('text', text.id)"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, withDefaults } from 'vue'
import StickerItem from './StickerItem.vue'
import ChalkText from './ChalkText.vue'
import type { StickerItem as StickerType, ChalkTextItem, Position } from '@/types'

interface Props {
  stickers: StickerType[]
  texts: ChalkTextItem[]
  showTexts?: boolean
}

interface Emits {
  (e: 'update-sticker-position', id: string, position: Position): void
  (e: 'update-text-position', id: string, position: Position): void
  (e: 'bring-to-front', type: 'sticker' | 'text', id: string): void
}

const props = withDefaults(defineProps<Props>(), {
  showTexts: true
})
const emit = defineEmits<Emits>()

const blackboardRef = ref<HTMLElement | null>(null)
const scrollAreaRef = ref<HTMLElement | null>(null)
const isMobile = ref(window.innerWidth <= 768)

const handleItemClick = (type: 'sticker' | 'text', id: string) => {
  emit('bring-to-front', type, id)
}

const handleResize = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.blackboard {
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.01), transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.01), transparent 50%),
    #2a2d3a;
  background-size: 100% 100%;
  border-radius: 10px;
  position: relative;
  overflow: auto;
  border: 15px solid #8b4513;
  box-shadow: 
    inset 0 0 100px rgba(0, 0, 0, 0.5),
    inset 0 0 20px rgba(255, 255, 255, 0.05);
}

.blackboard::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 50px,
      rgba(255, 255, 255, 0.01) 50px,
      rgba(255, 255, 255, 0.01) 51px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 50px,
      rgba(255, 255, 255, 0.01) 50px,
      rgba(255, 255, 255, 0.01) 51px
    );
  pointer-events: none;
  opacity: 0.3;
}

.logo-watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3em;
  color: rgba(255, 255, 255, 0.05);
  font-weight: bold;
  pointer-events: none;
  z-index: 1;
  letter-spacing: 3px;
  text-align: center;
}

.scroll-area {
  width: 100%;
  height: 100%;
  position: relative;
}

.scroll-area.mobile-scroll {
  width: 130%;
  min-height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .blackboard {
    border-width: 8px;
    -webkit-overflow-scrolling: touch;
  }
  
  .logo-watermark {
    font-size: 1.8em;
  }
}
</style>