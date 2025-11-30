import React, { useState } from 'react';
import { Copy, Check, Download, FileJson } from 'lucide-react';
import { exportAsText, exportAsJSON, generateFilename } from '../../utils/exportUtils';

const PromptPreview = ({ promptText, variables, onUpdateVariable, activeMode = 'text' }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleExportText = () => {
        exportAsText(promptText, generateFilename(activeMode, 'txt'));
    };

    const handleExportJSON = () => {
        const data = {
            prompt: promptText,
            mode: activeMode,
            variables,
            exportedAt: new Date().toISOString(),
        };
        exportAsJSON(data, generateFilename(activeMode, 'json'));
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Final Prompt</h3>
                <div className="flex gap-2">
                    <button
                        onClick={handleExportText}
                        className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all"
                        title="Export as Text"
                    >
                        <Download size={16} />
                    </button>
                    <button
                        onClick={handleExportJSON}
                        className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all"
                        title="Export as JSON"
                    >
                        <FileJson size={16} />
                    </button>
                    <button
                        onClick={handleCopy}
                        className={`p-2 rounded-lg transition-all ${copied ? 'bg-green-500/20 text-green-400' : 'hover:bg-white/5 text-slate-400 hover:text-white'
                            }`}
                        title="Copy to Clipboard"
                    >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-black/20 rounded-xl p-4 border border-white/5 overflow-y-auto text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                {promptText || 'プロンプトがここに表示されます...'}
            </div>

            {variables && Object.keys(variables).length > 0 && (
                <div className="mt-4">
                    <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">Variables</h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                        {Object.entries(variables).map(([key, value]) => (
                            <div key={key} className="space-y-1">
                                <label className="text-xs text-slate-500 capitalize">{key.replace(/_/g, ' ')}</label>
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => onUpdateVariable(key, e.target.value)}
                                    className="w-full bg-surface/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 text-slate-200"
                                    placeholder={`Enter ${key}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PromptPreview;
