import { DiffEditor, Editor } from "@monaco-editor/react";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LanguageLabel } from '../runCodeEditorDaisyUI/LanguageController';
import RunButton from '../runCodeEditorDaisyUI/runButton&Output/RunButton';
import { useEditorMethod } from "../../hooks/useEditorMethod";

export const EditorAndAnswer = ({ 
  className = "", 
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

  const tabClass = "px-4 border-t border-x rounded-t-sm font-bold focus:outline-none relative";
  const activeTabClass = "bg-slate-950 text-orange-500 border-yellow-800 border-b-0 after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[1px] after:bg-slate-950";
  const inactiveTabClass = "bg-slate-900 text-yellow-900 border-transparent hover:text-amber-700";

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
    toggleBlur2,
    isBlur
  )  

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
          <EditorForUser 
                          card={card}
                          runUserCode={runUserCode}
                          userIsLoading={userIsLoading}
                          handleUserEditorDidMount={handleUserEditorDidMount}
                          handleUserEditorChange={handleUserEditorChange}

                          />
          <EditorAnswer 
                          card={card}
                          runAnswerCode={runAnswerCode}
                          answerIsLoading={answerIsLoading}
                          pointToggleBlur={pointToggleBlur}
                          bluredCards={bluredCards}
                          isBlur={isBlur}
                          editorHeight={editorHeight}
                          handleAnswerEditorDidMount={handleAnswerEditorDidMount}
          />

        </div>
        <div
          role="tabpanel"
          id="diff-panel"
          className={`p-6 ${activeTab === 'diff' ? '' : 'hidden'}`}
        >
          <DiffEditorContent
                            card={card}
                            editorHeight={editorHeight}
                            handleDiffEditorDidMount={handleDiffEditorDidMount}
          />
        </div>
      </div>
    </div>
  );
};

export const EditorForUser = ({
                                card, // LanguageLabel 、Editor コンポーネント用
                                runUserCode, userIsLoading, // RunButton コンポーネント用
                                editorHeight, userEditorContent, handleUserEditorDidMount, handleUserEditorChange // Editor コンポーネント用
}) => {
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

export const EditorAnswer = ({
                        card,
                        runAnswerCode,
                        answerIsLoading,
                        pointToggleBlur,
                        bluredCards,
                        isBlur,
                        editorHeight,
                        handleAnswerEditorDidMount

}) => {
  return (
    <div className="border border-purple-900 bg-slate-950 p-4 rounded-sm">
        <div className="flex flex-wrap pb-2">
          <LanguageLabel language={card?.language} />
          <RunButton runCode={runAnswerCode} isLoading={answerIsLoading} />
          <button role="button" className="border border-blue-950 bg-black hover:bg-orange-950 min-w-44 flex justify-center items-center font-bold min-h-0 h-8 px-2 rounded-md" 
                  // onClick={() => {setIsAnserEditorBlur(!isAnserEditorBlur)}}
                  onClick={() => pointToggleBlur(card?.id)}
          >

            {bluredCards 
              ? (bluredCards[card?.id] ? "解答例を表示する" : "解答例を隠す")
              : (isBlur ? "解答例を隠す" : "解答例を表示する")}
          </button>
          {/* bluredCards && とすることで 初回レンダリングのエラーを防いでいるけど、きれいではない気はする */}
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

export const DiffEditorContent = ({
                                    card,
                                    editorHeight,
                                    handleDiffEditorDidMount
  }) => {
  return (
  <div className="border border-green-900 bg-slate-950 p-4 rounded-md">
    <div className="pb-2">
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