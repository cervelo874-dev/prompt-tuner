import { useState, useEffect } from 'react';

const STORAGE_KEY = 'prompt_tuner_history';

/**
 * プロンプト履歴管理フック
 */
export const usePromptHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                setHistory(parsed);
            }
        } catch (error) {
            console.error('Failed to load history:', error);
        }
    }, []);

    const saveToStorage = (newHistory) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
        } catch (error) {
            console.error('Failed to save history:', error);
        }
    };

    const addToHistory = (prompt, mode, variables = {}) => {
        const newItem = {
            id: Date.now(),
            prompt,
            mode,
            variables,
            createdAt: new Date().toISOString(),
        };

        const newHistory = [newItem, ...history].slice(0, 50);
        setHistory(newHistory);
        saveToStorage(newHistory);
        return newItem;
    };

    const deleteFromHistory = (id) => {
        const newHistory = history.filter(item => item.id !== id);
        setHistory(newHistory);
        saveToStorage(newHistory);
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    return {
        history,
        addToHistory,
        deleteFromHistory,
        clearHistory,
    };
};
