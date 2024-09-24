import React, { useRef, useState, useCallback, useEffect, useDebugValue } from 'react';
import { DiffEditor, Editor } from "@monaco-editor/react";
import { LanguageLabel } from '../RunCodeEditorDaisyUI/LanguageController';
import RunButton from '../RunCodeEditorDaisyUI/RunButton&Output/RunButton';

export const EditorAndAnswer = ({ 
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
  const diffEditorRef = useRef(null);
  const [userEditorContent,  setUserEditorContent]  = useState("");
  const prevCardIdRef = useRef(null);
  const userEditorContentMap = useRef(new Map());
  const [activeTab, setActiveTab] = useState('editor')

  useEffect(() => {
    if (prevCardIdRef.current !== card.id) {
      // カードが変更された場合
      if (prevCardIdRef.current) {
        // 前のカードの内容を保存
        userEditorContentMap.current.set(prevCardIdRef.current, userEditorContent);
      }
      
      // 新しいカードの内容をロード（存在する場合）または空にする
      const newContent = userEditorContentMap.current.get(card.id) || "";
      setUserEditorContent(newContent);
      
      prevCardIdRef.current = card.id;
    }
  }, [card.id, userEditorContent]);

  const handleUserEditorDidMount = (editor) => {
    userEditorRef.current = editor;
    setCurrentCardId(card.id);
  };

  const handleAnswerEditorDidMount = (editor) => {
    answerEditorRef.current = editor;
  };

  const handleDiffEditorDidMount = (editor) => {
    diffEditorRef.current = editor;
    const originalEditor = editor.getOriginalEditor();
    originalEditor.updateOptions({ readOnly: false });
  };

  const updateDiffEditor = useCallback(() => {
    if (diffEditorRef.current && userEditorRef.current) {
      const originalEditor = diffEditorRef.current.getOriginalEditor();
      originalEditor.setValue(userEditorRef.current.getValue() || "");
    }
  }, [userEditorRef]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    if (tabName === 'diff') {
      updateDiffEditor();
    }
  };

  const handleUserEditorChange = (value) => {
    setUserEditorContent(value);
  };

  const tabClass = "px-4 border-t border-x rounded-t-sm font-bold focus:outline-none relative";
  const activeTabClass = "bg-slate-950 text-orange-500 border-yellow-800 border-b-0 after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[1px] after:bg-slate-950";
  const inactiveTabClass = "bg-slate-900 text-yellow-900 border-transparent hover:text-amber-700";

  const editorContent = (
    <div className={`grid grid-cols-2 gap-4 ${className}`}>
      <div className="border border-cyan-900 bg-slate-950 p-4 rounded-sm">
        <div className="flex pb-2">
          <LanguageLabel language={card.language} />
          <RunButton runCode={runUserCode} isLoading={userIsLoading} />
        </div>
        <Editor
          height="15vh"
          theme="vs-dark"
          language={card.language}
          value={userEditorContent}
          defaultValue=""
          options={{
            fontSize: 14
          }}
          onMount={handleUserEditorDidMount}
          onChange={handleUserEditorChange}
        />
      </div>
      <div className="border border-purple-900 bg-slate-950 p-4 rounded-sm">
        <div className="flex pb-2">
          <LanguageLabel language={card.language} />
          <RunButton runCode={runAnswerCode} isLoading={answerIsLoading} />
        </div>
        <Editor
          height="15vh"
          theme="vs-dark"
          language={card.language}
          value={card.answer}
          defaultValue={card.answer}
          options={{
            fontSize: 14,
            readOnly: true
          }}
          onMount={handleAnswerEditorDidMount}
        />
      </div>
    </div>
  );

  const diffEditorContent = (
    <div className="border border-green-900 bg-slate-950 p-4 rounded-md">
      <div className="pb-2">
        <LanguageLabel language={card.language} />
      </div>
      <DiffEditor
        height="15vh"
        theme="vs-dark"
        language={card.language}
        original=""
        modified={card.answer}
        options={{
          fontSize: 14,
          renderSideBySide: true,
          readOnly: true,
          originalEditable: false,
        }}
        onMount={handleDiffEditorDidMount}
      />
    </div>
  );

  return (
    <div className="w-full">
      <div role="tablist" className="flex border-b border-yellow-800">
        <button
          role="tab"
          className={`${tabClass} ${activeTab === 'editor' ? activeTabClass : inactiveTabClass} cursor-auto h-7 text-sm`}
          onClick={() => handleTabChange('editor')}
          aria-selected={activeTab === 'editor'}
          aria-controls="editor-panel"
        >
          Editor
        </button>
        <button
          role="tab"
          className={`${tabClass} ${activeTab === 'diff' ? activeTabClass : inactiveTabClass} cursor-auto h-7 text-sm `}
          onClick={() => handleTabChange('diff')}
          aria-selected={activeTab === 'diff'}
          aria-controls="diff-panel"
        >
          Diff
        </button>
      </div>
      <div className="bg-slate-950 border-x border-b border-yellow-800 rounded-b-md">
        <div
          role="tabpanel"
          id="editor-panel"
          className={`p-6 ${activeTab === 'editor' ? '' : 'hidden'}`}
        >
          {editorContent}
        </div>
        <div
          role="tabpanel"
          id="diff-panel"
          className={`p-6 ${activeTab === 'diff' ? '' : 'hidden'}`}
        >
          {diffEditorContent}
        </div>
      </div>
    </div>
  );
};
