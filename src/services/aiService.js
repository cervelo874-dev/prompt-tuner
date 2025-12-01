/**
 * AI APIサービス
 */

const API_SETTINGS_KEY = 'prompt_tuner_api_settings';

/**
 * API設定を取得
 */
export const getAPISettings = () => {
    try {
        const saved = localStorage.getItem(API_SETTINGS_KEY);
        return saved ? JSON.parse(saved) : { apiKey: '', provider: 'gemini' };
    } catch (error) {
        console.error('Failed to load API settings:', error);
        return { apiKey: '', provider: 'gemini' };
    }
};

/**
 * API設定を保存
 */
export const saveAPISettings = (settings) => {
    try {
        localStorage.setItem(API_SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
        console.error('Failed to save API settings:', error);
    }
};

/**
 * Gemini APIを使用してAI応答を取得
 */
export const getAIResponse = async (message, context = []) => {
    const settings = getAPISettings();

    if (!settings.apiKey) {
        return {
            success: false,
            error: 'APIキーが設定されていません。設定画面からAPIキーを入力してください。'
        };
    }

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${settings.apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: message
                                }
                            ]
                        }
                    ]
                })
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.error?.message || response.statusText;
            const statusCode = response.status;

            // より詳細なエラーメッセージ
            let userMessage = `API Error (${statusCode}): ${errorMessage}`;

            if (statusCode === 400) {
                userMessage = 'APIキーが無効です。Google AI Studioで新しいキーを作成してください。';
            } else if (statusCode === 403) {
                userMessage = 'API権限エラー。Generative Language APIが有効になっているか確認してください。';
            } else if (statusCode === 404) {
                userMessage = 'APIモデルが見つかりません。最新版にアップデートしてください。';
            } else if (statusCode === 429) {
                userMessage = 'リクエスト制限に達しました。しばらく待ってから再試行してください。';
            }

            throw new Error(userMessage);
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            console.error('API Response:', data);
            throw new Error('APIから応答がありませんでした。APIキーを確認してください。');
        }

        return {
            success: true,
            text
        };
    } catch (error) {
        console.error('AI API Error:', error);
        return {
            success: false,
            error: error.message || 'API呼び出しに失敗しました'
        };
    }
};
