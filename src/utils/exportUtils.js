/**
 * プロンプトをテキストファイルとしてエクスポート
 */
export const exportAsText = (prompt, filename = 'prompt.txt') => {
    const blob = new Blob([prompt], { type: 'text/plain;charset=utf-8' });
    downloadBlob(blob, filename);
};

/**
 * プロンプトをJSON形式でエクスポート
 */
export const exportAsJSON = (data, filename = 'prompt.json') => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
    downloadBlob(blob, filename);
};

/**
 * Blobをダウンロード
 */
const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

/**
 * 現在の日時からファイル名を生成
 */
export const generateFilename = (mode, extension = 'txt') => {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, -5);
    return `prompt_${mode}_${timestamp}.${extension}`;
};
