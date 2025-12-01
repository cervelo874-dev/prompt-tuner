import { useState } from 'react';
import { getAIResponse } from '../services/aiService';

/**
 * AI Tunerロジックを管理するフック
 */
export const useAITuner = (activeMode) => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'bot',
            text: `Hello! I'm your ${activeMode} prompt tuner. What kind of ${activeMode} do you want to create today?`
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async (userMessage) => {
        const userMsg = {
            id: Date.now(),
            sender: 'user',
            text: userMessage
        };

        // 楽観的UI更新
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);

        setIsLoading(true);

        const systemPrompt = `You are an expert prompt engineer helping users create high-quality prompts for ${activeMode} generation. 
Your goal is to help the user refine their prompt to get the best possible results from Generative AI.

Guidelines:
1. Ask clarifying questions if the user's request is vague.
2. Suggest specific improvements to wording, style, or parameters.
3. If you suggest a complete prompt, please enclose it in a code block like this:
\`\`\`
Your suggested prompt here
\`\`\`
This allows the user to easily copy or apply it.

4. Keep responses concise and helpful. Avoid long lectures.`;

        // 履歴を含めてAPIを呼び出す
        // システムプロンプトは履歴の最初に追加するか、コンテキストとして扱う
        // ここでは履歴の直前にシステムプロンプトを挿入する形をとるが、
        // aiService側で調整してもよい。今回はシンプルに履歴を渡す。

        // 履歴からシステムメッセージを除外して、純粋な会話履歴を作成
        const history = newMessages.filter(m => m.sender !== 'system');

        // システムプロンプトをコンテキストとして追加（実際には履歴の先頭には入れず、毎回指示する形がGeminiには有効）
        const fullMessage = `${systemPrompt}\n\nUser: ${userMessage}`;

        // 過去の会話履歴を渡す（直近10件程度に制限すると良いが、今回は全件渡す）
        // ただし、今回のリクエスト分（userMessage）はgetAIResponse内で追加されるため、
        // ここでは newMessages の最後（今回分）を除いたものを渡す必要がある。
        const previousHistory = newMessages.slice(0, -1);

        const response = await getAIResponse(fullMessage, previousHistory);

        setIsLoading(false);

        const botMsg = {
            id: Date.now() + 1,
            sender: 'bot',
            text: response.success
                ? response.text
                : `⚠️ ${response.error}`
        };

        setMessages(prev => [...prev, botMsg]);
    };

    const resetChat = () => {
        setMessages([
            {
                id: Date.now(),
                sender: 'bot',
                text: `Switched to ${activeMode} mode. How can I help you draft a ${activeMode} prompt?`
            }
        ]);
    };

    return {
        messages,
        isLoading,
        sendMessage,
        resetChat
    };
};
