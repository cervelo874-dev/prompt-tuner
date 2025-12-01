# GitHub Pages デプロイエラー解決手順

## 現在の状況
- ✅ ビルド成功
- ❌ デプロイ失敗
- ワークフロー実行時間: 34秒

## 解決手順（順番に実行）

### ステップ1: GitHub Pages設定を確認・修正

1. **GitHubリポジトリページを開く**
   ```
   https://github.com/cervelo874-dev/prompt-tuner
   ```

2. **Settings タブをクリック**

3. **左メニューから Pages を選択**

4. **Source設定を確認**
   - 現在の設定を確認
   - **GitHub Actions** になっていない場合:
     - ドロップダウンから **GitHub Actions** を選択
     - 自動的に保存される

5. **Environment を確認** (同じPagesページ)
   - `github-pages` environmentが作成されているか確認
   - なければ自動で作成されます

### ステップ2: Workflow Permissions を設定

1. **Settings → Actions → General** に移動

2. **Workflow permissions** セクションまでスクロール

3. 以下を選択:
   - ⚫ **Read and write permissions** （重要！）
   - ✅ **Allow GitHub Actions to create and approve pull requests**

4. **Save** をクリック

### ステップ3: ワークフローを再実行

1. **Actions タブ** をクリック

2. **失敗したワークフロー（Initial commit）** をクリック

3. 右上の **Re-run all jobs** ボタンをクリック

4. 確認ダイアログで **Re-run jobs** をクリック

### ステップ4: デプロイ完了を確認

- ワークフローが実行される（2-5分）
- ✅ が表示されたら成功
- デプロイURL:
  ```
  https://cervelo874-dev.github.io/prompt-tuner/
  ```

## まだ失敗する場合

### 詳細エラーログを確認

1. Actions タブで失敗したワークフローをクリック
2. 左側の **deploy** ジョブをクリック
3. エラーメッセージをコピー
4. 以下のパターンを確認:

**パターンA: "Error: No uploaded artifact was found!"**
- ビルドステップで dist フォルダが作成されていない
- 解決策: vite.config.js の build 設定を確認

**パターンB: "Error: Failed to create deployment"**  
- Permissions不足
- 解決策: ステップ2の Workflow permissions を確認

**パターンC: "Error: HttpError: Resource not accessible by integration"**
- Pages が有効になっていない
- 解決策: ステップ1の Pages 設定を確認

## クイックチェックリスト

Settings → Pages:
- [ ] Source = **GitHub Actions** ✅

Settings → Actions → General:
- [ ] Workflow permissions = **Read and write permissions** ✅
- [ ] Allow GitHub Actions to create and approve pull requests = **チェック** ✅

確認後:
- [ ] Actions → Re-run all jobs を実行 ✅

## 次のステップ

上記の設定を完了したら:
1. ワークフローを再実行
2. 2-5分待つ
3. `https://cervelo874-dev.github.io/prompt-tuner/` にアクセス

まだエラーが出る場合は、エラーログの詳細を教えてください！
