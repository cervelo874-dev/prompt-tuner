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
        setMessages(prev => [...prev, userMsg]);

        setIsLoading(true);

        const systemPrompt = `You are an expert prompt engineer helping users create high-quality prompts for ${activeMode} generation. 
Ask clarifying questions to understand their needs better and guide them to create effective prompts.
Keep responses concise and helpful.`;

        const fullMessage = `${systemPrompt}\n\nUser: ${userMessage}`;

        const response = await getAIResponse(fullMessage);

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
