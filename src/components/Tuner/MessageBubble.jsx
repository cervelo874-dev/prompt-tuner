import React from 'react';

const MessageBubble = ({ message }) => {
    const isUser = message.sender === 'user';

    return (
        <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
            {!isUser && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-primary/20 text-blue-300 text-sm font-medium">
                    AI
                </div>
            )}
            <div className={`max-w-[80%] p-3 rounded-2xl ${isUser
                    ? 'bg-primary/30 text-slate-100 rounded-tr-none'
                    : 'bg-surface/50 border border-white/5 text-slate-300 rounded-tl-none'
                }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
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
