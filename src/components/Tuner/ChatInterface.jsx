import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import MessageBubble from './MessageBubble';
import { useAITuner } from '../../hooks/useAITuner';

const ChatInterface = ({ activeMode, onApplyPrompt }) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);
    const { messages, isLoading, sendMessage, resetChat } = useAITuner(activeMode);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        resetChat();
    }, [activeMode]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const messageText = input;
        setInput('');
        await sendMessage(messageText);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map(msg => (
                    <MessageBubble key={msg.id} message={msg} onApply={onApplyPrompt} />
                ))}
                {isLoading && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-primary/20 text-blue-300">
                            <Loader2 size={18} className="animate-spin" />
                        </div>
                        <div className="max-w-[80%] p-3 rounded-2xl bg-surface/50 border border-white/5 rounded-tl-none">
                            <p className="text-sm text-slate-400">Thinking...</p>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-white/10 bg-surface/30 backdrop-blur-md">
                <form onSubmit={handleSend} className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLoading}
                        placeholder={`Describe your ${activeMode} idea...`}
                        className="w-full bg-surface/50 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-500 disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary hover:bg-primary/80 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatInterface;
