# Prompt Tuner 🎨✨

**AIパワード・プロンプト作成ツール** - テキスト、画像、動画生成AI向けのプロフェッショナルなプロンプト作成アプリケーション

## 🌟 主な機能

- ✨ **動的変数システム** - `{{variable}}` 形式のテンプレートベースプロンプト生成
- 🤖 **Gemini AI統合** - リアルタイムAI応答でプロンプト作成を支援
- 📝 **マルチモーダル** - テキスト/画像/動画の3生成モード
- 💾 **履歴管理** - LocalStorageで最大50件まで自動保存
- 📤 **エクスポート** - テキスト/JSON形式で保存
- 🎨 **グラスモーフィズムUI** - モダンで美しいダークテーマ
- 🔄 **サイドバー統合** - 履歴とテンプレートの折りたたみ表示

## 🚀 クイックスタート

### 必要環境
- Node.js 20以上
- npm または yarn

### インストール

```bash
# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで `http://localhost:5173` を開く

## 🔑 API設定

1. [Google AI Studio](https://makersuite.google.com/app/apikey) でGemini APIキーを取得
2. アプリの「Settings」からAPIキーを設定
3. AIチャット機能が利用可能になります

## 💻 使い方

1. **モード選択**: サイドバーでText/Image/Videoを選択
2. **変数入力**: Variablesセクションで値を入力
3. **AIチャット**: 左側のチャットでAIに質問してプロンプトを改善
4. **エクスポート**: 完成したプロンプトをテキストまたはJSON形式で保存

## 🏗️ 技術スタック

- **Frontend**: React 19 + Vite 7
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **AI**: Google Gemini API
- **Storage**: LocalStorage
- **Deploy**: GitHub Pages with Actions

## 📁 プロジェクト構造

```
src/
├── components/
│   ├── Layout/          # AppLayout, Sidebar
│   ├── Tuner/           # ChatInterface, MessageBubble
│   ├── Editor/          # PromptPreview
│   ├── History/         # HistoryList, HistoryItem
│   └── Settings/        # ApiSettings
├── hooks/               # usePromptTemplate, usePromptHistory, etc.
├── services/            # aiService (Gemini API)
└── utils/               # templateEngine, exportUtils
```

## 🚀 デプロイ

```bash
# ビルド
npm run build

# ローカルプレビュー
npm run preview
```

GitHub Pagesへのデプロイ手順は `DEPLOYMENT.md` を参照

## 📄 ライセンス

MIT License
