<template>
  <div class="wall-container">
    <BlackBoard
      :stickers="stickers"
      :texts="texts"
      @update-sticker-position="updateStickerPosition"
      @update-text-position="updateTextPosition"
      @bring-to-front="bringToFront"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BlackBoard from './BlackBoard.vue'
import type { StickerItem, ChalkTextItem, Position, BoardConfig } from '@/types'
import { sampleStickers, sampleTexts } from '@/types'

const stickers = ref<StickerItem[]>([])
const texts = ref<ChalkTextItem[]>([])
let maxZIndex = 100

const isMobile = () => window.innerWidth <= 768

const getBoardConfig = (): BoardConfig => {
  if (isMobile()) {
    return {
      gridCols: 4,
      gridRows: 4,
      overlapFactor: 0.6
    }
  } else {
    return {
      gridCols: 5,
      gridRows: 3,
      overlapFactor: 0.5
    }
  }
}

const generateRandomPosition = (index: number, boardWidth: number, boardHeight: number): Position => {
  const config = getBoardConfig()
  const col = index % config.gridCols
  const row = Math.floor(index / config.gridCols) % config.gridRows
  
  const cellWidth = (boardWidth - 100) / config.gridCols
  const cellHeight = (boardHeight - 100) / config.gridRows
  
  const baseX = col * cellWidth + 50
  const baseY = row * cellHeight + 50
  
  const offsetX = (Math.random() - 0.5) * cellWidth * config.overlapFactor
  const offsetY = (Math.random() - 0.5) * cellHeight * config.overlapFactor
  
  return {
    x: Math.max(20, Math.min(baseX + offsetX, boardWidth - 150)),
    y: Math.max(20, Math.min(baseY + offsetY, boardHeight - 150))
  }
}

const initializeItems = () => {
  const boardWidth = window.innerWidth - 40
  const boardHeight = window.innerHeight * 0.9
  
  // Initialize stickers
  stickers.value = sampleStickers.map((sticker, index) => ({
    ...sticker,
    id: `sticker-${index}`,
    position: generateRandomPosition(index, boardWidth, boardHeight),
    size: `size-${Math.floor(Math.random() * 4) + 1}` as StickerItem['size'],
    rotation: Math.random() * 40 - 20,
    zIndex: 10 + Math.floor(Math.random() * 30)
  }))
  
  // Initialize texts (50% probability)
  texts.value = sampleTexts
    .filter(() => Math.random() > 0.5)
    .map((text, index) => ({
      ...text,
      id: `text-${index}`,
      position: {
        x: Math.random() * (boardWidth - 200) + 50,
        y: Math.random() * (boardHeight - 100) + 50
      },
      fontSize: isMobile() ? 0.9 + Math.random() * 0.5 : 1.2 + Math.random() * 0.8,
      rotation: Math.random() * 20 - 10,
      zIndex: 10 + Math.floor(Math.random() * 30)
    }))
}

const updateStickerPosition = (id: string, position: Position) => {
  const sticker = stickers.value.find(s => s.id === id)
  if (sticker) {
    sticker.position = position
  }
}

const updateTextPosition = (id: string, position: Position) => {
  const text = texts.value.find(t => t.id === id)
  if (text) {
    text.position = position
  }
}

const bringToFront = (type: 'sticker' | 'text', id: string) => {
  const item = type === 'sticker' 
    ? stickers.value.find(s => s.id === id)
    : texts.value.find(t => t.id === id)
  
  if (item) {
    item.zIndex = maxZIndex++
  }
}

onMounted(() => {
  initializeItems()
})
</script>

<style scoped>
.wall-container {
  width: 100%;
  max-width: 1600px;
  height: 90vh;
  position: relative;
  border-radius: 10px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
}

@media (max-width: 768px) {
  .wall-container {
    height: 95vh;
  }
}
</style>