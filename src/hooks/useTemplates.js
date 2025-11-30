import { useState, useEffect } from 'react';

const STORAGE_KEY = 'prompt_tuner_templates';

/**
 * カスタムテンプレート管理フック
 */
export const useTemplates = (mode) => {
    const [customTemplates, setCustomTemplates] = useState({});

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                setCustomTemplates(JSON.parse(saved));
            }
        } catch (error) {
            console.error('Failed to load templates:', error);
        }
    }, []);

    const saveToStorage = (templates) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
        } catch (error) {
            console.error('Failed to save templates:', error);
        }
    };

    const saveTemplate = (name, template, variables) => {
        const newTemplate = {
            name,
            template,
            variables,
            createdAt: new Date().toISOString(),
        };

        const updated = {
            ...customTemplates,
            [mode]: {
                ...(customTemplates[mode] || {}),
                [name.toLowerCase().replace(/\s+/g, '_')]: newTemplate,
            },
        };

        setCustomTemplates(updated);
        saveToStorage(updated);
    };

    const deleteTemplate = (templateKey) => {
        const modeTemplates = { ...customTemplates[mode] };
        delete modeTemplates[templateKey];

        const updated = {
            ...customTemplates,
            [mode]: modeTemplates,
        };

        setCustomTemplates(updated);
        saveToStorage(updated);
    };

    return {
        customTemplates: customTemplates[mode] || {},
        saveTemplate,
        deleteTemplate,
    };
};
