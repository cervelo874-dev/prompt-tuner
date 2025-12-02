import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import ApiSettings from '../Settings/ApiSettings';

const AppLayout = ({ children }) => {
    const [activeMode, setActiveMode] = useState('text');
    const [showSettings, setShowSettings] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background text-white">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <Sidebar
                    activeMode={activeMode}
                    onModeChange={(mode) => {
                        setActiveMode(mode);
                        setIsSidebarOpen(false); // Close sidebar on selection (mobile)
                    }}
                    onSettingsClick={() => {
                        setShowSettings(true);
                        setIsSidebarOpen(false);
                    }}
                    onClose={() => setIsSidebarOpen(false)} // For mobile close button
                />
            </div>

            <main className="flex-1 flex flex-col h-full overflow-hidden relative w-full">
                <header className="h-16 glass-panel border-b border-white/10 flex items-center justify-between px-4 lg:px-8 shrink-0 z-10">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 -ml-2 text-slate-400 hover:text-white lg:hidden"
                        >
                            <Menu size={24} />
                        </button>

                        <h2 className="text-lg font-medium text-slate-200 capitalize truncate">
                            {activeMode} <span className="hidden sm:inline">Generation Mode</span>
                        </h2>
                        <span className="px-2 py-0.5 text-xs rounded-full bg-primary/20 text-blue-300 border border-blue-500/30 shrink-0">
                            Beta
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 ring-2 ring-white/20"></div>
                    </div>
                </header>

                <div className="flex-1 overflow-hidden p-4 lg:p-6 relative">
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
