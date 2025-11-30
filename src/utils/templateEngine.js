/**
 * テンプレートエンジン: {{variable}} 形式の変数を置換
 */
export const processTemplate = (template, variables) => {
    if (!template || typeof template !== 'string') return '';

    let result = template;
    Object.entries(variables).forEach(([key, value]) => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        result = result.replace(regex, value || `[${key}]`);
    });

    return result;
};

/**
 * テンプレートから変数を抽出
 */
export const extractVariables = (template) => {
    if (!template || typeof template !== 'string') return [];

    const regex = /{{(\w+)}}/g;
    const variables = [];
    let match;

    while ((match = regex.exec(template)) !== null) {
        if (!variables.includes(match[1])) {
            variables.push(match[1]);
        }
    }

    return variables;
};

/**
 * デフォルトテンプレート
 */
export const defaultTemplates = {
    text: {
        blog: {
            name: 'ブログ記事',
            template: `{{topic}}についての包括的なブログ記事を書いてください。

対象読者: {{audience}}
トーン: {{tone}}
文字数: {{length}}文字程度

以下の点を含めてください:
- 導入
- 主要なポイント（3-5個）
- 具体例
- 結論`,
            variables: {
                topic: 'AI技術の未来',
                audience: '一般読者',
                tone: '親しみやすく分かりやすい',
                length: '2000'
            }
        }
    },
    image: {
        realistic: {
            name: 'リアリスティック',
            template: `{{subject}}, {{style}}, {{lighting}}, {{quality}}
--ar {{aspect_ratio}} --v 6.0`,
            variables: {
                subject: '未来都市の夜景',
                style: 'フォトリアリスティック',
                lighting: 'シネマティックライティング',
                quality: '8K, 高精細',
                aspect_ratio: '16:9'
            }
        }
    },
    video: {
        cinematic: {
            name: 'シネマティック',
            template: `{{shot_type}} of {{subject}}, {{camera_movement}}, {{lighting}}, {{duration}}
Quality: {{quality}}`,
            variables: {
                shot_type: 'ドローンショット',
                subject: '山頂からの日の出',
                camera_movement: 'スローパン',
                lighting: 'ゴールデンアワー',
                duration: '10秒',
                quality: '4K cinematic'
            }
        }
    }
};
