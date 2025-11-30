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
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${settings.apiKey}`,
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
            throw new Error(`API request failed: ${response.statusText}`);
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            throw new Error('No response text from API');
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
