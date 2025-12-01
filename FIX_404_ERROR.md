# 404エラー解決 - モデル名更新

## 問題
```
Failed to load resource: the server responded with a status of 404
API request failed
```

## 原因
APIエンドポイントのモデル名が古い（`gemini-pro`）ため、404エラーが発生。

## 解決策

### ✅ 修正完了
`src/services/aiService.js` を更新しました：

**変更前:**
```javascript
gemini-pro:generateContent
```

**変更後:**
```javascript
gemini-1.5-flash:generateContent
```

### 🚀 デプロイ手順

**1. GitHubにプッシュ**
```bash
git add .
git commit -m "Fix API 404 error: Update to gemini-1.5-flash model"
git push
```

**2. GitHub Actionsで自動デプロイ**
- https://github.com/cervelo874-dev/prompt-tuner/actions
- ワークフローが実行される（3-5分）
- ✅ が表示されたら完了

**3. デプロイ完了後**
- https://cervelo874-dev.github.io/prompt-tuner/
- ページをリロード（Ctrl + F5）
- チャットで「Hello」とテスト

## 最新のGemini モデル（2024年12月）

✅ **gemini-1.5-flash** - 高速、無料枠が大きい（推奨）  
✅ **gemini-1.5-pro** - より高性能  
❌ **gemini-pro** - 古いモデル（404エラー）

## 無料枠の制限

**gemini-1.5-flash:**
- 15 リクエスト/分
- 1,500 リクエスト/日
- 100万トークン/月

十分な制限です！

## テスト

デプロイ後：
1. Settings でAPIキーが保存されているか確認
2. チャットで「こんにちは」と送信
3. AIが日本語で応答すれば成功

## まだエラーが出る場合

- APIキーを再作成（念のため）
- ブラウザキャッシュクリア（Ctrl + Shift + Delete）
- 別のブラウザで試す

これで404エラーは解決します！
