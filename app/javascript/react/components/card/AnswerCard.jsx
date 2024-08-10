import React from 'react';
import { useRunCode } from '../../hooks/useRunCode';
import RunCodeEditor from '../RunCodeEditorDaisyUI/CodeEditor';
import Output from '../RunCodeEditorDaisyUI/RunButton&Output/Output';
import RunButton from '../RunCodeEditorDaisyUI/RunButton&Output/RunButton';
import { CODE_SNIPPETS } from '../RunCodeEditorDaisyUI/constants';
import { LanguageSelector } from '../RunCodeEditorDaisyUI/LanguageController';
import { RemarksEditor } from '../Editor/MarkdownEditor';


export const Answer = ({ value, onChange, language, onLanguageChange }) => {

  const onSelect = (newLanguage) => {
    onLanguageChange(newLanguage);
    onChange(CODE_SNIPPETS[newLanguage]);
  };

  const {runCode, isLoading, output, setOutput, editorRef, isError, setIsError} = useRunCode(language);

  return(
    <>
        <div className="card shadow-xl bg-purple-950  card-bordered border-fuchsia-400">
          <div className="card-body">
            <div className="flex flex-col sm:flex-row">
              <h2 className="card-title text-fuchsia-400 font-courier mr-8">解答コード</h2>
              <div className="flex sm:flex-row">
                <LanguageSelector language={language} onSelect={onSelect} />
                <RunButton runCode={runCode} isLoading={isLoading} />
              </div>
            </div>
            <RunCodeEditor
              value={value}
              onChange={onChange}
              language={language}
              onLanguageChange={onLanguageChange}
              editorRef={editorRef}
            />
            <h2 className="card-title text-fuchsia-400 font-courier mr-8"></h2>
            <Output editorRef={editorRef} language={language} output={output} setOutput={setOutput} isError={isError} setIsError={setIsError} height="172px"/>
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