# GitHub Pagesデプロイ手順

## 前提条件
- GitHubアカウント
- GitHub Desktop または Git がインストール済み
- リポジトリ名: `prompt-tuner`

## デプロイステップ

### 1. GitHubリポジトリ作成
1. https://github.com/new にアクセス
2. Repository name: `prompt-tuner`
3. Public を選択
4. **全てのチェックボックスを外す**
5. Create repository

### 2. コードをアップロード

#### GitHub Desktop使用
1. File → Add local repository
2. フォルダ選択: `prompt-tuner`
3. "create a repository" をクリック
4. Commit: `Initial commit`
5. Publish repository (Public)

#### コマンドライン使用
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/prompt-tuner.git
git push -u origin main
```

### 3. GitHub Pages設定
1. Settings → Pages
2. Source: **GitHub Actions**
3. 自動保存

### 4. デプロイ確認
- Actions タブでワークフロー確認
- 完了後（3-5分）、以下でアクセス可能:
  ```
  https://YOUR_USERNAME.github.io/prompt-tuner/
  ```

## 更新デプロイ

コード変更後:
```bash
git add .
git commit -m "Update"
git push
```

自動的に再デプロイされます

## トラブルシューティング

### ビルドエラー
- Actions タブでログ確認
- `vite.config.js` の `base` 設定を確認

### 404エラー
- GitHub Pages設定が正しいか確認
- デプロイ完了まで5分待つ
