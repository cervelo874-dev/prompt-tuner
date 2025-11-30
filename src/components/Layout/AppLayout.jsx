import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ApiSettings from '../Settings/ApiSettings';

const AppLayout = ({ children }) => {
    const [activeMode, setActiveMode] = useState('text');
    const [showSettings, setShowSettings] = useState(false);

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background text-white">
            <Sidebar
                activeMode={activeMode}
                onModeChange={setActiveMode}
                onSettingsClick={() => setShowSettings(true)}
            />

            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                <header className="h-16 glass-panel border-b border-white/10 flex items-center justify-between px-8 shrink-0 z-10">
                    <div className="flex items-center gap-4">
                        <h2 className="text-lg font-medium text-slate-200 capitalize">
                            {activeMode} Generation Mode
                        </h2>
                        <span className="px-2 py-0.5 text-xs rounded-full bg-primary/20 text-blue-300 border border-blue-500/30">
                            Beta
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 ring-2 ring-white/20"></div>
                    </div>
                </header>

                <div className="flex-1 overflow-hidden p-6 relative">
                    {React.Children.map(children, child =>
                        React.cloneElement(child, { activeMode })
                    )}
                </div>
            </main>

            {showSettings && <ApiSettings onClose={() => setShowSettings(false)} />}
        </div>
    );
};

export default AppLayout;
