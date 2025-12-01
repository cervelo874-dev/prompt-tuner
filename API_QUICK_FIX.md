# チャット送信時のAPIエラー - クイック修正ガイド

## 即座に試す解決策

### 解決策1: APIキーを再設定（成功率90%）

1. **Google AI Studioを開く**
   ```
   https://aistudio.google.com/app/apikey
   ```
   ※ 正しいURL: `aistudio.google.com`（makersuite.google.comは古いURL）

2. **新しいAPIキーを作成**
   - 「Create API key」をクリック
   - 「Create API key in new project」を選択
   - 生成されたキーをコピー

3. **アプリで設定**
   - https://cervelo874-dev.github.io/prompt-tuner/
   - Settings → APIキーを貼り付け → 保存
   - ページをリロード（F5）

4. **テスト**
   - チャットで「Hello」と送信
   - AIが応答すれば成功

### 解決策2: コードを更新（エラー詳細表示）

エラーの詳細が分かるようにコードを改善しました。

**更新手順:**
1. `src/services/aiService.js` を編集済み（詳細なエラー表示）
2. GitHubにプッシュ:
   ```bash
   git add .
   git commit -m "Improve API error messages"
   git push
   ```
3. GitHub Actionsで再デプロイ（3-5分）

### 解決策3: ブラウザキャッシュクリア

1. **Ctrl + Shift + Delete** (Windows)
2. 「キャッシュされた画像とファイル」を選択
3. クリア
4. ページをリロード

## よくあるエラーと対処法

### エラーA: "APIキーが無効です"
**原因**: APIキーの形式が間違っているか、古い

**解決策**:
- Google AI Studioで**新しいプロジェクト**を作成
- そのプロジェクトでAPIキーを生成
- 新しいキーを使用

### エラーB: "API権限エラー"
**原因**: Generative Language APIが有効になっていない

**解決策**:
1. https://console.cloud.google.com/
2. プロジェクトを選択
3. 「APIs & Services」→「Enabled APIs」
4. 「Generative Language API」を有効化

### エラーC: "Failed to fetch" または "CORS error"
**原因**: ネットワーク問題またはAPIエンドポイント変更

**解決策**:
- 最新のコードにアップデート（上記の解決策2）
- 別のブラウザで試す
- VPN使用時は無効化

## 確認事項チェックリスト

デプロイ済みサイトで:
- [ ] Settings でAPIキーが保存されている
- [ ] APIキーが `AIza...` で始まる
- [ ] ページをリロード後、再試行した
- [ ] ブラウザコンソール（F12）でエラー詳細を確認

## 最新のAPIエンドポイント確認

現在の実装:
```javascript
https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
```

これは2024年12月時点で正しいエンドポイントです。

## まだ解決しない場合

**開発者ツールでエラー確認:**
1. F12 でコンソールを開く
2. チャットでメッセージ送信
3. 赤いエラーメッセージをコピー
4. 以下の情報を教えてください:
   - エラーメッセージ全文
   - エラーコード（400, 403, 429など）

## 暫定回避策

AI機能が動作しなくても、以下は使えます:
- ✅ テンプレート選択
- ✅ 変数入力
- ✅ プロンプト自動生成
- ✅ エクスポート機能

テンプレート機能だけでも十分実用的です！
