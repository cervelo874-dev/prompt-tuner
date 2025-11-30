import React, { useState, useEffect } from 'react';
import { Key, Save } from 'lucide-react';
import { getAPISettings, saveAPISettings } from '../../services/aiService';

const ApiSettings = ({ onClose }) => {
    const [apiKey, setApiKey] = useState('');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const settings = getAPISettings();
        setApiKey(settings.apiKey || '');
    }, []);

    const handleSave = () => {
        saveAPISettings({ apiKey, provider: 'gemini' });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="glass-panel rounded-2xl p-6 w-full max-w-md m-4">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/20 rounded-lg">
                        <Key className="text-blue-400" size={20} />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-200">API Settings</h2>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-slate-400 block mb-2">
                            Gemini API Key
                        </label>
                        <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="AIzaSy..."
                            className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-200"
                        />
                        <p className="text-xs text-slate-500 mt-2">
                            Google AI Studioで取得できます:{' '}
                            <a
                                href="https://makersuite.google.com/app/apikey"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 underline"
                            >
                                APIキーを取得
                            </a>
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handleSave}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-all ${saved
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                    : 'glass-button'
                                }`}
                        >
                            <Save size={16} />
                            {saved ? '保存しました' : '保存'}
                        </button>
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-lg font-medium bg-surface/50 hover:bg-surface/70 border border-white/10 transition-all"
                        >
                            閉じる
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApiSettings;
