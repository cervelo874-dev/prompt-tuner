# Gemini API エラー トラブルシューティング

## よくあるエラーと解決策

### エラー1: "API request failed: 400 Bad Request"

**原因**: APIキーが無効または形式が間違っている

**解決策**:
1. APIキーを再確認
   - https://makersuite.google.com/app/apikey
   - 新しいキーを作成
   - `AIza` で始まる文字列であることを確認

2. APIキーを再入力
   - Settings を開く
   - 古いキーを削除
   - 新しいキーを貼り付け
   - 保存

### エラー2: "API request failed: 403 Forbidden"

**原因**: APIキーの権限不足またはGenerative AI APIが有効になっていない

**解決策**:
1. Google Cloud Consoleで確認
   - https://console.cloud.google.com/
   - APIs & Services → Enabled APIs
   - "Generative Language API" が有効か確認
   - 無効の場合、有効化する

2. 新しいプロジェクトでAPIキーを作成
   - Google AI Studio で新規プロジェクト作成
   - 新しいAPIキーを生成

### エラー3: "API request failed: 429 Too Many Requests"

**原因**: レート制限に達した

**解決策**:
- 数分待ってから再試行
- 無料枠: 60リクエスト/分

### エラー4: "Failed to fetch" または CORS エラー

**原因**: ネットワークまたはCORS問題（稀）

**解決策**:
1. ブラウザコンソールでエラー詳細を確認
2. ページをリロード
3. 別のブラウザで試す

### エラー5: "No response text from API"

**原因**: API応答のフォーマットが想定と異なる

**解決策**:
- APIキーが最新のGemini API用であることを確認
- Google AI Studio で Gemini Pro モデルのキーを使用

## 確認手順

### ステップ1: APIキーの確認

1. **Google AI Studio を開く**
   ```
   https://makersuite.google.com/app/apikey
   ```

2. **新しいAPIキーを作成**
   - "Create API key" をクリック
   - プロジェクトを選択（または新規作成）
   - キーをコピー

3. **キーの形式を確認**
   - 正しい形式: `AIzaSy...` (39文字)
   - スペースや改行が入っていないこと

### ステップ2: アプリでAPIキーを設定

1. **デプロイされたサイトを開く**
   ```
   https://cervelo874-dev.github.io/prompt-tuner/
   ```

2. **Settings を開く**
   - サイドバーの Settings をクリック

3. **APIキーを入力**
   - 貼り付け時にスペースが入らないよう注意
   - 保存

### ステップ3: テスト

1. **チャットで簡単な質問**
   ```
   Hello
   ```

2. **エラーメッセージを確認**
   - ブラウザの開発者ツール (F12)
   - Console タブ
   - エラーの詳細をコピー

## デバッグ方法

### ブラウザコンソールでエラー確認

1. **F12 キー** を押して開発者ツールを開く
2. **Console** タブを選択
3. チャットでメッセージを送信
4. 赤いエラーメッセージを確認

**よくあるエラーメッセージ:**
```
AI API Error: API request failed: 400
→ APIキーが無効

AI API Error: API request failed: 403
→ API権限不足

Failed to fetch
→ ネットワークまたはCORS問題
```

## 現在のAPI設定確認

アプリの実装:
- **エンドポイント**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`
- **モデル**: `gemini-pro`
- **メソッド**: POST

この設定は最新のGemini API仕様に準拠しています。

## まだ解決しない場合

以下の情報を教えてください:
1. **エラーメッセージ全文**（ブラウザコンソールから）
2. **APIキーの最初の6文字**（例: AIzaSy...）
3. **どんな操作をした時にエラーが出るか**

より詳細なサポートを提供します。

## 代替案

Gemini APIが動作しない場合でも、アプリの他の機能は使えます:
- ✅ テンプレートシステム
- ✅ 変数入力
- ✅ プロンプト生成
- ✅ エクスポート機能
- ✅ 履歴管理

AIチャットなしでプロンプト作成ツールとして利用できます。
