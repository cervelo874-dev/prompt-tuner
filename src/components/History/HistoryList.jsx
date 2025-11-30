import React from 'react';
import { History as HistoryIcon, Trash } from 'lucide-react';
import HistoryItem from './HistoryItem';

const HistoryList = ({ history, onLoadItem, onDeleteItem, onClearAll }) => {
    if (history.length === 0) {
        return (
            <div className="p-6 text-center">
                <HistoryIcon className="mx-auto mb-3 text-slate-600" size={32} />
                <p className="text-sm text-slate-500">履歴はまだありません</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="font-medium text-slate-300">履歴 ({history.length})</h3>
                {history.length > 0 && (
                    <button
                        onClick={onClearAll}
                        className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                    >
                        <Trash size={12} />
                        全削除
                    </button>
                )}
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {history.map(item => (
                    <HistoryItem
                        key={item.id}
                        item={item}
                        onLoad={onLoadItem}
                        onDelete={onDeleteItem}
                    />
                ))}
            </div>
        </div>
    );
};

export default HistoryList;
