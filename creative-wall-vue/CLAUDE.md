# Creative Wall Vue.js アプリケーション

## 🎯 プロジェクト概要
Vue Fes Japanのクリエイティブウォールを再現したデジタル版のインタラクティブボードアプリケーション。
黒板風の背景に画像やテキストをステッカーのように配置し、ドラッグ&ドロップで自由に移動できる。

## 📁 プロジェクト構造

```
creative-wall-vue/
├── src/
│   ├── App.vue                    # ルートコンポーネント
│   ├── components/
│   │   ├── CreativeWall.vue       # メインコンテナ（データ管理）
│   │   ├── BlackBoard.vue         # 黒板UI（表示領域）
│   │   ├── StickerItem.vue        # 画像ステッカーコンポーネント
│   │   └── ChalkText.vue          # チョーク風テキストコンポーネント
│   ├── composables/
│   │   └── useDraggable.ts        # ドラッグ機能のコンポジャブル
│   └── types/
│       └── index.ts               # TypeScript型定義とサンプルデータ
```

## 🔧 主要コンポーネント

### CreativeWall.vue
**役割**: データ管理とレイアウト計算
**主要な責務**:
- ステッカーとテキストのデータ管理
- 初期配置の計算（グリッドベース＋ランダムオフセット）
- z-index管理（前面表示の制御）

### BlackBoard.vue
**役割**: 黒板風の表示領域
**主要な責務**:
- 黒板のビジュアル（背景、枠線、グリッド線）
- スクロール領域の管理（モバイル対応）
- 子コンポーネントの配置

### StickerItem.vue
**役割**: 個別の画像ステッカー
**主要な責務**:
- 画像の表示
- ドラッグ操作の処理
- サイズバリエーション（size-1〜4）
- 回転角度の適用

### ChalkText.vue
**役割**: チョーク風テキスト
**主要な責務**:
- テキストの表示
- カラーバリエーション（yellow, pink, blue, green, white）
- ドラッグ操作の処理

## 📊 データ構造

### StickerItem型
```typescript
{
  id: string                    // 一意のID
  url: string                   // 画像URL
  title: string                 // タイトル（alt属性）
  position: { x, y }            // 座標
  size: 'size-1'〜'size-4'     // サイズクラス
  rotation: number              // 回転角度（度）
  zIndex: number                // 重なり順
}
```

### ChalkTextItem型
```typescript
{
  id: string                    // 一意のID
  text: string                  // 表示テキスト
  color: string                 // カラークラス
  position: { x, y }            // 座標
  fontSize: number              // フォントサイズ（em）
  rotation: number              // 回転角度（度）
  zIndex: number                // 重なり順
}
```

## 🎨 デザインカスタマイズポイント

### 1. 黒板の背景色変更
**ファイル**: `src/components/BlackBoard.vue`
**場所**: `.blackboard`のbackgroundプロパティ（37-42行目）
```css
background: #2a2d3a;  /* この色を変更 */
```

### 2. 画像サイズの調整
**ファイル**: `src/components/StickerItem.vue`
**場所**: スタイルセクションの最下部（88-91行目）
```css
.sticker-size-1 { width: 120px; height: 120px; }
.sticker-size-2 { width: 150px; height: 150px; }
.sticker-size-3 { width: 180px; height: 180px; }
.sticker-size-4 { width: 100px; height: 100px; }
```

### 3. チョークテキストの色追加
**ファイル**: `src/components/ChalkText.vue`
**場所**: スタイルセクション（65-90行目）に新しい色クラスを追加
```css
.chalk-text.color-新色名 {
  color: #カラーコード;
  text-shadow: ...
}
```

### 4. 枠線（木枠）のスタイル
**ファイル**: `src/components/BlackBoard.vue`
**場所**: `.blackboard`のborderプロパティ（47行目）
```css
border: 15px solid #8b4513;  /* 幅と色を変更 */
```

## 🖼️ 画像データの入れ替え方法

### 方法1: サンプルデータを直接編集
**ファイル**: `src/types/index.ts`
**場所**: `sampleStickers`配列（42-62行目）

```typescript
export const sampleStickers = [
  { 
    url: '新しい画像URL', 
    title: '画像の説明' 
  },
  // ... 追加の画像
]
```

### 方法2: CreativeWall.vueで初期化時にデータを変更
**ファイル**: `src/components/CreativeWall.vue`
**場所**: `initializeItems`関数（57-75行目）

### 方法3: 外部APIから画像を取得
CreativeWall.vueの`onMounted`フックで外部データを取得：
```typescript
onMounted(async () => {
  // APIから画像データを取得
  const response = await fetch('/api/images')
  const data = await response.json()
  // データを処理して表示
})
```

## 🎮 レイアウト制御

### グリッド配置の調整
**ファイル**: `src/components/CreativeWall.vue`
**場所**: `getBoardConfig`関数（24-35行目）

```typescript
// PC向け
gridCols: 5,      // 横の列数
gridRows: 3,      // 縦の行数
overlapFactor: 0.5 // 重なり度（0-1）

// スマホ向け
gridCols: 4,
gridRows: 4,
overlapFactor: 0.6
```

## 📱 レスポンシブ設定

### ブレークポイント
- **スマホ**: 768px以下
- **タブレット**: 769px〜1024px
- **PC**: 1025px以上

### モバイル特有の機能
- 横スクロール領域（幅130%）
- 画像サイズの自動縮小
- タッチ操作の最適化

## 🚀 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

## 🔍 デバッグのヒント

1. **画像が表示されない場合**
   - ブラウザのコンソールでCORSエラーを確認
   - 画像URLが正しいか確認

2. **ドラッグが効かない場合**
   - `touch-action: none`が設定されているか確認
   - z-indexの競合がないか確認

3. **レイアウトが崩れる場合**
   - ビューポートのメタタグを確認
   - CSSのbox-sizingがborder-boxになっているか確認

## 📝 よくあるカスタマイズ

### テキストを増やす
`src/types/index.ts`の`sampleTexts`配列に追加

### アニメーションを追加
各コンポーネントのCSSに`@keyframes`と`animation`プロパティを追加

### 新しいエフェクトを追加
`src/components/StickerItem.vue`や`ChalkText.vue`の`:hover`スタイルを編集

---

このドキュメントはClaude Codeが理解しやすいように構造化されています。
変更を行う際は、該当ファイルと行番号を参照してください。