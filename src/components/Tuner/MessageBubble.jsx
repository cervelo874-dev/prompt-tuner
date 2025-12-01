import React from 'react';
import { ArrowRightCircle } from 'lucide-react';

const MessageBubble = ({ message, onApply }) => {
    const isUser = message.sender === 'user';

    // コードブロックを検出して抽出する
    const extractCodeBlock = (text) => {
        const regex = /```(?:[\w]*\n)?([\s\S]*?)```/;
        const match = text.match(regex);
        return match ? match[1].trim() : null;
    };

    const codeBlockContent = !isUser && onApply ? extractCodeBlock(message.text) : null;

    return (
        <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
            {!isUser && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-primary/20 text-blue-300 text-sm font-medium">
                    AI
                </div>
            )}
            <div className={`max-w-[80%] flex flex-col gap-2`}>
                <div className={`p-3 rounded-2xl ${isUser
                    ? 'bg-primary/30 text-slate-100 rounded-tr-none'
                    : 'bg-surface/50 border border-white/5 text-slate-300 rounded-tl-none'
                    }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                </div>

                {/* Apply Button for AI messages with code blocks */}
                {codeBlockContent && (
                    <button
                        onClick={() => onApply(codeBlockContent)}
                        className="self-start flex items-center gap-2 px-3 py-1.5 bg-primary/20 hover:bg-primary/30 text-blue-300 text-xs rounded-lg transition-colors border border-primary/20"
                    >
                        <ArrowRightCircle size={14} />
                        Apply to Editor
                    </button>
                )}
            </div>
            {isUser && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-blue-500 to-violet-500 text-white text-sm font-medium">
                    You
                </div>
            )}
        </div>
    );
};

export default MessageBubble;
