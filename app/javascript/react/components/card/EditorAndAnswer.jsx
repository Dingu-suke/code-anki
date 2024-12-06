import { DiffEditor, Editor } from "@monaco-editor/react";
import React from 'react';
import { LanguageLabel } from '../runCodeEditorDaisyUI/LanguageController';
import { useEditor } from "../../context/useEditor";
import { useEditorMethod } from "../../hooks/useEditorMethod";
import { activeTabClassOrange, inactiveTabClassOrange, tabClass } from "../../tabStylesAndFunc/styleClass";
import RunButton from "../runCodeEditorDaisyUI/runButton-Output/RunButton";

export const EditorAndAnswer = ({   
  card,
  runUserCode,
  runAnswerCode,
  userIsLoading,
  answerIsLoading,
  userEditorRef,
  answerEditorRef,
  setCurrentCardId,
  editorHeight,
  bluredCards,
  toggleBlur,
  toggleBlur2,
  isBlur
}) => {  

  const {
    userEditorContent,  setUserEditorContent,
    activeTab, setActiveTab,
    
    prevCardIdRef,
    userEditorContentMap,
    handleUserEditorDidMount,
    handleAnswerEditorDidMount,
    handleDiffEditorDidMount,
    updateDiffEditor,
    handleTabChange,
    handleUserEditorChange,
    pointToggleBlur

                              } = useEditorMethod(

    card,
    runUserCode,
    runAnswerCode,
    userIsLoading,
    answerIsLoading,
    userEditorRef,
    answerEditorRef,
    setCurrentCardId,
    editorHeight,
    bluredCards,
    toggleBlur,
    // toggleBlur2,
    // isBlur
  )

  return (
    <div className="w-full">
      <div role="tablist" className="flex border-b border-yellow-800">
        <button
          role="tab"
          className={`${tabClass} ${activeTab === 'editor' ? activeTabClassOrange : inactiveTabClassOrange} cursor-auto h-7 text-sm`}
          onClick={() => handleTabChange('editor')}
          aria-selected={activeTab === 'editor'}
          aria-controls="editor-panel"
        >
          Editor
        </button>
        <button
          role="tab"
          className={`${tabClass} ${activeTab === 'diff' ? activeTabClassOrange : inactiveTabClassOrange} cursor-auto h-7 text-sm `}
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
        </div>
        <div
          role="tabpanel"
          id="diff-panel"
          className={`p-6 ${activeTab === 'diff' ? '' : 'hidden'}`}
        >
        </div>
      </div>
    </div>
  );
};

export const EditorForUser = () => {
  const {
    card,                       // LanguageLabel 、Editor コンポーネント用
    runUserCode, userIsLoading, // RunButton コンポーネント用
    editorHeight, userEditorContent, handleUserEditorDidMount, handleUserEditorChange 
  } = useEditor();

  return (
    <div className="border border-cyan-900 bg-slate-950 p-4 rounded-sm">
      <div className="flex pb-2">
        <LanguageLabel language={card?.language} />
        <RunButton runCode={runUserCode} isLoading={userIsLoading} />
      </div>
      <Editor
        height={editorHeight || "15vh"}
        theme="vs-dark"
        language={card?.language}
        value={userEditorContent}
        defaultValue=""
        options={{
          fontSize: 14
        }}
        onMount={handleUserEditorDidMount}
        onChange={handleUserEditorChange}
      />
    </div>
  )
}

export const EditorForAnswer = () => {
  const {
          card,                                     // LanguageLabel 、Editor コンポーネント用 props
          runAnswerCode, answerIsLoading,           // RunButton コンポーネント用 props
          pointToggleBlur, bluredCards, isBlur,
          editorHeight, handleAnswerEditorDidMount  // Editor コンポーネント用 props
  } = useEditor()

  return (
    <div className="border border-purple-900 bg-slate-950 p-4 rounded-sm">
        <div className="flex flex-wrap pb-2">
          <LanguageLabel language={card?.language} />
          <RunButton runCode={runAnswerCode} isLoading={answerIsLoading} />
          <button role="button" className="border border-blue-950 bg-black hover:bg-orange-950 text-gray-400 hover:text-gray-300 min-w-44 flex justify-center items-center font-bold min-h-0 h-8 px-2 rounded-md" 
                  // onClick={() => {setIsAnserEditorBlur(!isAnserEditorBlur)}}
                  onClick={() => pointToggleBlur(card?.id)}
          >

            {bluredCards 
              ? (bluredCards[card?.id] ? "解答例を表示する" : "解答例を隠す")
              : (isBlur ? "解答例を隠す" : "解答例を表示する")}
          </button>
        </div>
        <div className={`${bluredCards && bluredCards[card?.id] ? "blur-lg" : ""}`}>
          <Editor
            height={editorHeight || "15vh"}
            theme="vs-dark"
            language={card?.language}
            value={card?.answer}
            defaultValue={card?.answer}
            options={{
              fontSize: 14,
              readOnly: true
            }}
            onMount={handleAnswerEditorDidMount}
          />
        </div>
      </div>
  )
}

export const DiffEditorContent = () => {
  const {
    card,                                   // LanguageLabel コンポーネント用 props
    editorHeight, handleDiffEditorDidMount  // Editor コンポーネント用 props
  } = useEditor()

  return (
  <div className="border border-green-900 bg-slate-950 p-4 rounded-md">
    <div className="flex pb-2">
      <LanguageLabel language={card?.language} />
    </div>
    <DiffEditor
      height={editorHeight || "15vh"}
      theme="vs-dark"
      language={card?.language}
      original=""
      modified={card?.answer}
      options={{
        fontSize: 14,
        renderSideBySide: true,
        readOnly: true,
        originalEditable: false,
      }}
      onMount={handleDiffEditorDidMount}
    />
  </div>
)};