import { Editor } from '@monaco-editor/react';
import React, { useRef, useState } from 'react';
import Markdown from 'react-markdown';
import { activeTabClassOrange, inactiveTabClassOrange, tabClass } from '../../tabStylesAndFunc/styleClass';
import { LanguageLabel } from '../runCodeEditorDaisyUI/LanguageController';
import { MarkdownView } from '../editor/MarkdownView';

export const SentenceAndAnswer = ({ card }) => {
  const editorEditorRef = useRef(null);
  const [activeTab, setActiveTab] = useState('question')

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const MarkdownContent = (
    <div className="col-span-4">
      <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded overflow-hidden">
        <div className="bg-slate-800 px-4 py-2 font-semibold">
          {card.title}
        </div>
        <div className="p-4 h-[calc(64vh-2rem)] overflow-auto">
          <MarkdownView bodyValue={card?.body} />
        </div>
      </div>
    </div>
  );

  const AnswerCode = (      
    <div className="border border-green-900 bg-slate-950 rounded-md overflow-hidden">
      <div className="bg-slate-800 px-4 py-2 font-semibold">
        <div className="grid grid-cols-2">
          <div className="text-cyan-50">
            {card.title}
          </div>
          <div className="justify-self-end">
            <LanguageLabel language={card.language} />
          </div>  
        </div>
      </div>
      <Editor
        height="60vh"
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
    <div className="w-full h-full">
      <div role="tablist" className="flex border-b border-yellow-800">
        <button
          role="tab"
          className={`${tabClass} ${activeTab === 'question' ? activeTabClassOrange : inactiveTabClassOrange} cursor-auto h-7 text-sm`}
          onClick={() => handleTabChange('question')}
          aria-selected={activeTab === 'question'}
          aria-controls="question-panel"
        >
          問題
        </button>
        <button
          role="tab"
          className={`${tabClass} ${activeTab === 'editor' ? activeTabClassOrange : inactiveTabClassOrange} cursor-auto h-7 text-sm `}
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