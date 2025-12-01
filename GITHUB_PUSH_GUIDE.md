# GitHub Desktop でプッシュする手順

## ステップ1: GitHub Desktopを開く

アプリケーションを起動します。

## ステップ2: 変更を確認

左側のパネルに変更されたファイルが表示されます:
- ✅ `src/services/aiService.js` (モデル名修正)
- その他、変更されたファイル

## ステップ3: コミット

1. **左下の Summary 欄**に入力:
   ```
   Fix 404 error: Update to gemini-1.5-flash
   ```

2. **Commit to main** ボタンをクリック

## ステップ4: プッシュ

画面上部の **Push origin** ボタンをクリック

## ステップ5: デプロイ確認

1. **View on GitHub** をクリック（または Actions タブを開く）
2. ワークフローが実行されるのを確認（3-5分）
3. ✅ が表示されたらデプロイ完了

## ステップ6: テスト

https://cervelo874-dev.github.io/prompt-tuner/
- ページをリロード（Ctrl + F5）
- Settings でAPIキー確認
- チャットで「Hello」とテスト
- AIが応答すれば成功！

---

## もし GitHub Desktop が見つからない場合

**コマンドラインで実行:**

```bash
# プロジェクトフォルダに移動
cd "C:\Users\cerve\OneDrive\デスクトップ\AntiGravity\prompt-tuner"

# 変更を確認
git status

# 全ての変更を追加
git add .

# コミット
git commit -m "Fix 404 error: Update to gemini-1.5-flash"

# プッシュ
git push
```

---

## トラブルシューティング

### "No changes" と表示される
→ ファイルが保存されているか確認（Ctrl + S）

### "Publish repository" と表示される
→ 初回の場合、これをクリック（Public に設定）

### 認証エラー
→ File → Options → Accounts でサインイン状態を確認

---

これでプッシュ完了です！
