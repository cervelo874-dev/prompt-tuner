import React, { useState } from 'react';
import { MessageSquare, Image, Video, History, Settings, Plus, ChevronDown, ChevronRight } from 'lucide-react';

const Sidebar = ({ activeMode, onModeChange, onSettingsClick }) => {
    const [showHistory, setShowHistory] = useState(false);
    const [showTemplates, setShowTemplates] = useState(false);

    const navItems = [
        { id: 'text', icon: MessageSquare, label: 'Text Gen' },
        { id: 'image', icon: Image, label: 'Image Gen' },
        { id: 'video', icon: Video, label: 'Video Gen' },
    ];

    return (
        <div className="w-64 h-full glass-panel border-r border-white/10 flex flex-col">
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                    Prompt Tuner
                </h1>
            </div>

            <div className="px-4 mb-6">
                <button className="w-full glass-button flex items-center justify-center gap-2">
                    <Plus size={18} />
                    <span>New Prompt</span>
                </button>
            </div>

            <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onModeChange(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeMode === item.id
                                ? 'bg-primary/20 text-blue-300 border border-blue-500/30'
                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.label}</span>
                    </button>
                ))}

                <div className="mt-4">
                    <button
                        onClick={() => setShowHistory(!showHistory)}
                        className="w-full flex items-center justify-between px-4 py-2 text-slate-400 hover:text-white rounded-lg transition-all"
                    >
                        <div className="flex items-center gap-2">
                            <History size={18} />
                            <span className="text-sm font-medium">History</span>
                        </div>
                        {showHistory ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                    {showHistory && (
                        <div className="mt-2 px-2 space-y-1">
                            <div className="text-xs text-slate-500 px-4 py-2">
                                No history items yet
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-2">
                    <button
                        onClick={() => setShowTemplates(!showTemplates)}
                        className="w-full flex items-center justify-between px-4 py-2 text-slate-400 hover:text-white rounded-lg transition-all"
                    >
                        <div className="flex items-center gap-2">
                            <MessageSquare size={18} />
                            <span className="text-sm font-medium">Templates</span>
                        </div>
                        {showTemplates ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                    {showTemplates && (
                        <div className="mt-2 px-2 space-y-1">
                            <div className="text-xs text-slate-500 px-4 py-2">
                                Templates available in mode
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            <div className="p-4 border-t border-white/10">
                <div className="space-y-1">
                    <button
                        onClick={onSettingsClick}
                        className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                    >
                        <Settings size={20} />
                        <span>Settings</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
