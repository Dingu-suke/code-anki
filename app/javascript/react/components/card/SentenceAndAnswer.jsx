import React, { useRef, useState, useCallback } from 'react';
import Markdown from 'react-markdown';
import { Editor } from '@monaco-editor/react';

export const SentenceAndAnswer = ({ 
  className = "", 
  card, 
  runUserCode,
  runAnswerCode,
  userIsLoading,
  answerIsLoading,
  userEditorRef,
  answerEditorRef,
  setCurrentCardId
}) => {
  const editorEditorRef = useRef(null);
  const [activeTab, setActiveTab] = useState('question')

  const updateDiffEditor = useCallback(() => {
    if (editorEditorRef.current && userEditorRef.current) {
      const originalEditor = editorEditorRef.current.getOriginalEditor();
      originalEditor.setValue(userEditorRef.current.getValue() || "");
    }
  }, [userEditorRef]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    if (tabName === 'editor') {
      updateDiffEditor();
    }
  };

  const tabClass = "px-4 border-t border-x rounded-t-sm font-bold focus:outline-none relative";
  const activeTabClass = "bg-slate-950 text-orange-500 border-yellow-800 border-b-0 after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[1px] after:bg-slate-950";
  const inactiveTabClass = "bg-slate-900 text-yellow-900 border-transparent hover:text-amber-700";

  const MarkdownContent = (
    <div className="col-span-4">
      <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded overflow-hidden">
        <div className="bg-slate-800 px-4 py-2 font-semibold">
          {card.title}
        </div>
        <div className="p-4 h-[calc(23vh-2rem)] overflow-auto">
          <Markdown>{card.body}</Markdown>
        </div>
      </div>
    </div>
  );

  const AnswerCode = (      
    <div className="border border-green-900 bg-slate-950 p-4 rounded-md">
      <div className="pb-2">
        {/* <LanguageLabel language={card.language} /> */}
      </div>
      <Editor
        height="20vh"
        theme="vs-dark"
        language={card.language}
        value={card.answer}
        original=""
        options={{
          fontSize: 13,
          renderSideBySide: true,
          readOnly: true,
          originalEditable: false,
        }}
      />
    </div>
  );

  return (
    <div className="w-full">
      <div role="tablist" className="flex border-b border-yellow-800">
        <button
          role="tab"
          className={`${tabClass} ${activeTab === 'question' ? activeTabClass : inactiveTabClass} cursor-auto h-7 text-sm`}
          onClick={() => handleTabChange('question')}
          aria-selected={activeTab === 'question'}
          aria-controls="question-panel"
        >
          問題
        </button>
        <button
          role="tab"
          className={`${tabClass} ${activeTab === 'editor' ? activeTabClass : inactiveTabClass} cursor-auto h-7 text-sm `}
          onClick={() => handleTabChange('editor')}
          aria-selected={activeTab === 'editor'}
          aria-controls="answer-panel"
        >
          解答コード
        </button>
      </div>
      <div className="bg-slate-950 border-x border-b border-yellow-800 rounded-b-md">
        <div
          role="tabpanel"
          id="question-panel"
          className={`p-6 ${activeTab === 'question' ? '' : 'hidden'}`}
        >
          {MarkdownContent}
        </div>
        <div
          role="tabpanel"
          id="answer-panel"
          className={`p-6 ${activeTab === 'editor' ? '' : 'hidden'}`}
        >
          {AnswerCode}
        </div>
      </div>
    </div>
  );
};