import React from 'react';
import { Trash2, Clock } from 'lucide-react';

const HistoryItem = ({ item, onLoad, onDelete }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 60) return `${diffMins}分前`;
        if (diffHours < 24) return `${diffHours}時間前`;
        if (diffDays < 7) return `${diffDays}日前`;
        return date.toLocaleDateString('ja-JP');
    };

    const truncate = (str, length = 60) => {
        if (str.length <= length) return str;
        return str.substring(0, length) + '...';
    };

    return (
        <div
            className="group p-3 rounded-lg bg-surface/30 border border-white/5 hover:border-primary/30 transition-all cursor-pointer"
            onClick={() => onLoad(item)}
        >
            <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock size={12} />
                    <span>{formatDate(item.createdAt)}</span>
                    <span className="px-1.5 py-0.5 rounded bg-primary/20 text-primary text-[10px] uppercase">
                        {item.mode}
                    </span>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(item.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded text-red-400 transition-all"
                    title="削除"
                >
                    <Trash2 size={14} />
                </button>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
                {truncate(item.prompt)}
            </p>
        </div>
    );
};

export default HistoryItem;
