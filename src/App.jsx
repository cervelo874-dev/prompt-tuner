import React from 'react';
import AppLayout from './components/Layout/AppLayout';
import ChatInterface from './components/Tuner/ChatInterface';
import PromptPreview from './components/Editor/PromptPreview';
import { usePromptTemplate } from './hooks/usePromptTemplate';

function App() {
    return (
        <AppLayout>
            <DashboardContent />
        </AppLayout>
    );
}

const DashboardContent = ({ activeMode }) => {
    const { variables, processedPrompt, updateVariable } = usePromptTemplate(activeMode);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* Left: Chat / Tuner Area */}
            <div className="glass-panel rounded-2xl flex flex-col h-full overflow-hidden">
                <div className="p-4 border-b border-white/10 bg-white/5">
                    <h3 className="text-lg font-semibold text-blue-300 flex items-center gap-2">
                        AI Tuner
                        <span className="text-xs font-normal text-slate-400 bg-white/5 px-2 py-0.5 rounded-full">Beta</span>
                    </h3>
                </div>
                <div className="flex-1 overflow-hidden">
                    <ChatInterface activeMode={activeMode} />
                </div>
            </div>

            {/* Right: Editor / Preview Area */}
            <div className="glass-panel rounded-2xl flex flex-col h-full overflow-hidden">
                <div className="p-4 border-b border-white/10 bg-white/5">
                    <h3 className="text-lg font-semibold text-violet-300">Prompt Editor</h3>
                </div>
                <div className="flex-1 overflow-hidden p-4">
                    <PromptPreview
                        promptText={processedPrompt}
                        variables={variables}
                        onUpdateVariable={updateVariable}
                        activeMode={activeMode}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
