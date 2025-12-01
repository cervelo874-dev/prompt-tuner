# GitHub Pages デプロイエラー - トラブルシューティングガイド

## よくある原因と解決策

### 1. GitHub Pages設定の確認

**問題**: Sourceが正しく設定されていない

**解決策**:
1. GitHubリポジトリ → **Settings**
2. 左メニュー → **Pages**
3. **Source** が **GitHub Actions** になっているか確認
4. なっていない場合、**GitHub Actions** に変更して保存

### 2. Permissionsの問題

**問題**: ワークフローにPages書き込み権限がない

**解決策A - リポジトリ設定で権限付与**:
1. Settings → Actions → General
2. **Workflow permissions** セクションまでスクロール
3. **Read and write permissions** を選択
4. **Allow GitHub Actions to create and approve pull requests** にチェック
5. Save

**解決策B - ワークフローファイル確認**:
`.github/workflows/deploy.yml` に以下が含まれているか確認:
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

### 3. GitHub Pagesが有効になっていない

**問題**: GitHub Pagesが初めて有効化されていない

**解決策**:
1. Settings → Pages
2. **Source** を一度 **None** に変更
3. 保存
4. 再度 **GitHub Actions** に変更
5. 保存

### 4. index.htmlのパス問題

**問題**: distフォルダにindex.htmlが生成されていない

**解決策**:
`index.html` がプロジェクトルートにあることを確認
（既に存在するので問題なし）

### 5. ブランチ名の問題

**問題**: mainブランチ以外にプッシュしている

**解決策**:
ワークフローは `main` ブランチのみ対象です。
現在のブランチを確認:
```bash
git branch
```

### 6. デプロイアーティファクトの問題

**エラーメッセージ例**: "No artifact found"

**解決策**:
ビルドステップでdistフォルダが正しく生成されているか確認。
GitHub Actions のビルドログで以下を確認:
- `npm run build` が成功
- `dist` フォルダが作成されている

## 確認手順

### ステップ1: エラーメッセージを確認
1. https://github.com/YOUR_USERNAME/prompt-tuner/actions
2. 失敗したワークフローをクリック
3. **deploy** ジョブをクリック
4. エラーメッセージをコピー

### ステップ2: Settings確認
1. Settings → Pages
2. Source = **GitHub Actions** か確認
3. Settings → Actions → General
4. Workflow permissions = **Read and write permissions** か確認

### ステップ3: 再実行
設定変更後:
1. Actions タブ
2. 失敗したワークフロー
3. **Re-run all jobs** をクリック

## 最も可能性の高い原因

GitHub Pages初回設定時は、以下の順序で設定することが重要:

1. **Settings → Pages → Source を GitHub Actions に設定**
2. **Settings → Actions → Workflow permissions を Read and write に設定**
3. **コードをプッシュ（または再実行）**

## まだ解決しない場合

具体的なエラーメッセージを教えてください:
- GitHub Actionsのログから
- Deploy ジョブのエラー内容

より詳細な解決策を提供します。
