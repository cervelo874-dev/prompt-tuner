import { useState, useEffect } from 'react';
import { processTemplate, defaultTemplates } from '../utils/templateEngine';

/**
 * プロンプトテンプレート管理フック
 */
export const usePromptTemplate = (activeMode) => {
    const [currentTemplate, setCurrentTemplate] = useState(null);
    const [variables, setVariables] = useState({});
    const [processedPrompt, setProcessedPrompt] = useState('');

    // モード変更時にデフォルトテンプレートを読み込む
    useEffect(() => {
        const modeTemplates = defaultTemplates[activeMode];
        if (modeTemplates) {
            const firstTemplate = Object.values(modeTemplates)[0];
            setCurrentTemplate(firstTemplate);
            setVariables(firstTemplate.variables || {});
        }
    }, [activeMode]);

    // テンプレートまたは変数が変更されたらプロンプトを生成
    useEffect(() => {
        if (currentTemplate && currentTemplate.template) {
            const result = processTemplate(currentTemplate.template, variables);
            setProcessedPrompt(result);
        }
    }, [currentTemplate, variables]);

    const updateVariable = (key, value) => {
        setVariables(prev => ({ ...prev, [key]: value }));
    };

    const loadTemplate = (template) => {
        setCurrentTemplate(template);
        setVariables(template.variables || {});
    };

    return {
        currentTemplate,
        variables,
        processedPrompt,
        updateVariable,
        loadTemplate,
        availableTemplates: defaultTemplates[activeMode] || {}
    };
};
