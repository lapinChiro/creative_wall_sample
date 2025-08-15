<template>
  <div class="wall-container">
    <div v-if="loading" class="loading">Loading images...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <template v-else>
      <button 
        class="toggle-text-btn"
        @click="showTexts = !showTexts"
      >
        {{ showTexts ? 'テキストを隠す' : 'テキストを表示' }}
      </button>
      <BlackBoard
        :stickers="stickers"
        :texts="texts"
        :show-texts="showTexts"
        @update-sticker-position="updateStickerPosition"
        @update-text-position="updateTextPosition"
        @bring-to-front="bringToFront"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BlackBoard from './BlackBoard.vue'
import type { StickerItem, ChalkTextItem, Position, BoardConfig } from '@/types'

const stickers = ref<StickerItem[]>([])
const texts = ref<ChalkTextItem[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const showTexts = ref(true)
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

const fetchData = async () => {
  try {
    const response = await fetch('https://beluga-aso.s3-ap-northeast-1.amazonaws.com/companies/c98823be-fe59-4d14-a4c9-0b501c55645e/pics/1e2b0ea0-7bce-437d-8240-f6a68d0eeba3/media_data.json')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    
    const images = data
      .filter((item: any) => item.media_url_https)
      .map((item: any) => ({
        url: item.media_url_https,
        title: item.text || 'Vue Fes Japan Image'
      }))
    
    const textsData = data
      .filter((item: any) => item.text)
      .map((item: any) => item.text)
      .filter((text: string) => text.length > 0) // 空でないテキストのみ
    
    return { images, texts: textsData }
  } catch (err) {
    console.error('Failed to fetch data:', err)
    error.value = 'Failed to load data'
    return { images: [], texts: [] }
  }
}

const initializeItems = async () => {
  const boardWidth = window.innerWidth - 40
  const boardHeight = window.innerHeight * 0.9
  
  // Fetch data
  loading.value = true
  const { images: fetchedImages, texts: fetchedTexts } = await fetchData()
  
  // Initialize stickers
  if (fetchedImages.length > 0) {
    stickers.value = fetchedImages.map((image: any, index: number) => ({
      url: image.url,
      title: image.title,
      id: `sticker-${index}`,
      position: generateRandomPosition(index, boardWidth, boardHeight),
      size: `size-${Math.floor(Math.random() * 4) + 1}` as StickerItem['size'],
      rotation: Math.random() * 40 - 20,
      zIndex: 10 + Math.floor(Math.random() * 30)
    }))
  }
  
  // Initialize texts from fetched data
  const colors = ['yellow', 'pink', 'blue', 'green', 'white']
  texts.value = fetchedTexts
    .slice(0, 15) // 最大15個のテキストを表示
    .filter(() => Math.random() > 0.3) // 70%の確率で表示
    .map((text: string, index: number) => ({
      text: text.substring(0, 30),
      color: colors[Math.floor(Math.random() * colors.length)],
      id: `text-${index}`,
      position: {
        x: Math.random() * (boardWidth - 200) + 50,
        y: Math.random() * (boardHeight - 100) + 50
      },
      fontSize: isMobile() ? 0.9 + Math.random() * 0.5 : 1.2 + Math.random() * 0.8,
      rotation: Math.random() * 20 - 10,
      zIndex: 10 + Math.floor(Math.random() * 30)
    }))
  
  loading.value = false
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-text-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid #333;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.toggle-text-btn:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.toggle-text-btn:active {
  transform: translateY(0);
}

.loading, .error {
  color: white;
  font-size: 1.5rem;
  text-align: center;
  padding: 20px;
}

.error {
  color: #ff6b6b;
}

@media (max-width: 768px) {
  .wall-container {
    height: 95vh;
  }
}
</style>