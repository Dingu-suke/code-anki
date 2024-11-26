import React, { useEffect, useState } from 'react';
import { useRunCode } from '../../hooks/useRunCode';
import { RemarksEditor } from '../editor/MarkdownEditor';
import RunCodeEditor from '../runCodeEditorDaisyUI/CodeEditor';
import { CODE_SNIPPETS, LANGUAGE_LABELS } from '../runCodeEditorDaisyUI/constants';
import { LanguageSelector } from '../runCodeEditorDaisyUI/LanguageController';
import Output from '../runCodeEditorDaisyUI/runButton&Output/Output';
import RunButton from '../runCodeEditorDaisyUI/runButton&Output/RunButton';


export const Answer = ({ value, onChange, language, onLanguageChange, selectedCard, error }) => {  
  const [lang, setLang] = useState(LANGUAGE_LABELS[language || null]);
  
  const onSelect = (newLanguage) => {
    onLanguageChange(newLanguage);
    setLang(LANGUAGE_LABELS[newLanguage])
    onChange(CODE_SNIPPETS[newLanguage]);
  };

  useEffect(() => {
    selectedCard && setLang(LANGUAGE_LABELS[selectedCard?.language])
  }, [selectedCard])

  const {runCode, isLoading, output, setOutput, editorRef, isError, setIsError} = useRunCode(language);

  return(
    <>
      <div className="rounded-2xl shadow-xl bg-gray-900 card-bordered border-fuchsia-800 h-[595px] px-4">
        <div className="">
          <div className="flex flex-col sm:flex-row">
            <h2 className="card-title text-fuchsia-400 font-courier pt-6 pl-5 text-xl font-bold pb-3">解答コード</h2>
            <div className="flex items-center justify-center">
              <div className="px-4">
                <LanguageSelector language={lang} onSelect={onSelect}/>
              </div>
              <div className="px-4 flex-glow">
                <RunButton runCode={runCode} isLoading={isLoading} className="px-4"/>
              </div>
            </div>
          </div>
          <div className="border border-gray-700">
            <RunCodeEditor
              value={value}
              onChange={onChange}
              language={language}
              onLanguageChange={onLanguageChange}
              editorRef={editorRef}
              error={error}
            />
          </div>
          <div className="pt-5">
            <Output editorRef={editorRef} language={language} output={output} setOutput={setOutput} isError={isError} setIsError={setIsError} height="172px"/>
          </div>
        </div>
      </div>
    </>
  )
};

export const Remarks = ({ editorRef, defaultValue, onBlur }) => {
  return (
    <>
      <div className="card shadow-xl  bg-purple-950 card-bordered border-purple-500">
      <div className="card-body">
        <h2 className="card-title text-fuchsia-400 font-courier">解答の備考など</h2>
          <RemarksEditor ref={editorRef} defaultValue={defaultValue} onBlur={onBlur}/>
      </div>
    </div>
    </>
  )
};