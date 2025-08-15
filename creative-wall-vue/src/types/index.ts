export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface StickerItem {
  id: string;
  url: string;
  title: string;
  position: Position;
  size: 'size-1' | 'size-2' | 'size-3' | 'size-4';
  rotation: number;
  zIndex: number;
}

export interface ChalkTextItem {
  id: string;
  text: string;
  color: 'yellow' | 'pink' | 'blue' | 'green' | 'white';
  position: Position;
  fontSize: number;
  rotation: number;
  zIndex: number;
}

export interface DragState {
  isDragging: boolean;
  draggedElement: HTMLElement | null;
  offset: Position;
  currentTouch: number | null;
}

export interface BoardConfig {
  gridCols: number;
  gridRows: number;
  overlapFactor: number;
}

// サンプルデータ
// export const sampleStickers: Omit<StickerItem, 'id' | 'position' | 'size' | 'rotation' | 'zIndex'>[] = [
//   { url: 'https://placehold.jp/ff6b6b/ffffff/300x200.png?text=サンプル01', title: '赤色のサンプル画像' },
//   { url: 'https://placehold.jp/4ecdc4/ffffff/300x200.png?text=サンプル02', title: '青緑色のサンプル画像' },
//   { url: 'https://placehold.jp/45b7d1/ffffff/300x200.png?text=サンプル03', title: '水色のサンプル画像' },
//   { url: 'https://placehold.jp/96ceb4/ffffff/300x200.png?text=サンプル04', title: '薄緑色のサンプル画像' },
//   { url: 'https://placehold.jp/ffeaa7/333333/300x200.png?text=サンプル05', title: '黄色のサンプル画像' },
//   { url: 'https://placehold.jp/fd79a8/ffffff/300x200.png?text=サンプル06', title: 'ピンク色のサンプル画像' },
//   { url: 'https://placehold.jp/a29bfe/ffffff/300x200.png?text=サンプル07', title: '紫色のサンプル画像' },
//   { url: 'https://placehold.jp/6c5ce7/ffffff/300x200.png?text=サンプル08', title: '濃紫色のサンプル画像' },
//   { url: 'https://placehold.jp/00b894/ffffff/300x200.png?text=サンプル09', title: '緑色のサンプル画像' },
//   { url: 'https://placehold.jp/00cec9/ffffff/300x200.png?text=サンプル10', title: 'シアン色のサンプル画像' },
//   { url: 'https://placehold.jp/e17055/ffffff/350x250.png?text=画像11', title: 'オレンジ系の画像' },
//   { url: 'https://placehold.jp/0984e3/ffffff/350x250.png?text=画像12', title: '青色の画像' },
//   { url: 'https://placehold.jp/fdcb6e/333333/350x250.png?text=画像13', title: '黄色系の画像' },
//   { url: 'https://placehold.jp/e84393/ffffff/350x250.png?text=画像14', title: 'ローズピンクの画像' },
//   { url: 'https://placehold.jp/55efc4/333333/350x250.png?text=画像15', title: 'ミント色の画像' },
//   { url: 'https://placehold.jp/74b9ff/ffffff/400x300.png?text=テスト16', title: 'スカイブルーの画像' },
//   { url: 'https://placehold.jp/a0e7e5/333333/400x300.png?text=テスト17', title: 'パステルシアンの画像' },
//   { url: 'https://placehold.jp/ffbe76/333333/400x300.png?text=テスト18', title: 'オレンジピールの画像' },
//   { url: 'https://placehold.jp/ff7979/ffffff/400x300.png?text=テスト19', title: 'コーラルレッドの画像' },
//   { url: 'https://placehold.jp/badc58/333333/400x300.png?text=テスト20', title: 'ライムグリーンの画像' }
// ]

export const sampleStickers: Omit<StickerItem, 'id' | 'position' | 'size' | 'rotation' | 'zIndex'>[] = [
  { url: 'https://pbs.twimg.com/media/GKYgcx6a8AAjWDd.jpg', title: '赤色のサンプル画像' },
  { url: 'https://pbs.twimg.com/media/GKYgcx6a8AAjWDd.jpg', title: '青緑色のサンプル画像' },
  { url: 'https://pbs.twimg.com/media/GKYgcx6a8AAjWDd.jpg', title: '水色のサンプル画像' },
  { url: 'https://pbs.twimg.com/media/GKYgcx6a8AAjWDd.jpg', title: '薄緑色のサンプル画像' },
  { url: 'https://pbs.twimg.com/media/GKYgcx6a8AAjWDd.jpg', title: '黄色のサンプル画像' },
  { url: 'https://pbs.twimg.com/media/GKYgcx6a8AAjWDd.jpg', title: 'ピンク色のサンプル画像' },
  { url: 'https://pbs.twimg.com/media/GKYgcx6a8AAjWDd.jpg', title: '紫色のサンプル画像' },
  { url: 'https://pbs.twimg.com/media/GKYgcx6a8AAjWDd.jpg', title: '濃紫色のサンプル画像' },
  { url: 'https://pbs.twimg.com/media/GKYgcx6a8AAjWDd.jpg', title: '緑色のサンプル画像' },
  { url: 'https://pbs.twimg.com/media/GKYgcx6a8AAjWDd.jpg', title: 'シアン色のサンプル画像' },
  { url: 'https://pbs.twimg.com/media/GKYgcx6a8AAjWDd.jpg', title: 'オレンジ系の画像' },
  { url: 'https://pbs.twimg.com/media/GKYgcx6a8AAjWDd.jpg', title: '青色の画像' },
  { url: 'https://pbs.twimg.com/media/GKYgcx6a8AAjWDd.jpg', title: '黄色系の画像' },
  { url: 'https://pbs.twimg.com/media/GKYgcx6a8AAjWDd.jpg', title: 'ローズピンクの画像' },
  { url: 'https://pbs.twimg.com/media/GKYgcx6a8AAjWDd.jpg', title: 'ミント色の画像' },
  { url: 'https://pbs.twimg.com/media/GKYgcx6a8AAjWDd.jpg', title: 'スカイブルーの画像' },
  { url: 'https://pbs.twimg.com/media/GKYgcx6a8AAjWDd.jpg', title: 'パステルシアンの画像' },
  { url: 'https://pbs.twimg.com/media/GKYgcx6a8AAjWDd.jpg', title: 'オレンジピールの画像' },
  { url: 'https://pbs.twimg.com/media/GKYgcx6a8AAjWDd.jpg', title: 'コーラルレッドの画像' },
  { url: 'https://pbs.twimg.com/media/GKYgcx6a8AAjWDd.jpg', title: 'ライムグリーンの画像' }
];

export const sampleTexts: Omit<ChalkTextItem, 'id' | 'position' | 'fontSize' | 'rotation' | 'zIndex'>[] = [
  { text: 'Vue.js最高！', color: 'green' },
  { text: 'Creative!', color: 'pink' },
  { text: '楽しいイベント', color: 'yellow' },
  { text: 'Thank you!', color: 'blue' },
  { text: '素敵な作品', color: 'green' },
  { text: 'この文章は30文字を超えるとても長いテキストですが、自動的に切り詰められます', color: 'white' },
  { text: 'Vue Fes Japanは日本最大級のVue.jsカンファレンスイベントです！', color: 'yellow' },
  { text: 'コンポーネント指向のフロントエンドフレームワークで開発効率アップ', color: 'pink' }
];