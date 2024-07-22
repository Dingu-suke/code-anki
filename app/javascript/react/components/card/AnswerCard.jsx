import React, { useEffect, useRef, useState } from 'react';
import RunCodeEditor from '../RunCodeEditorDaisyUI/CodeEditor';
import LanguageSelector from '../RunCodeEditorDaisyUI/LanguageSelector';
import Output from '../RunCodeEditorDaisyUI/RunButton&Output/Output';
import RunButton from '../RunCodeEditorDaisyUI/RunButton&Output/RunButton';
import { executeCode } from '../RunCodeEditorDaisyUI/api';
import { CODE_SNIPPETS } from '../RunCodeEditorDaisyUI/constants';
import { RemarksEditor } from '../Editor/MarkddownEditor';




export const Answer = ({ value, onChange, language, onLanguageChange }) => {

  const onSelect = (newLanguage) => {
    onLanguageChange(newLanguage);
    onChange(CODE_SNIPPETS[newLanguage]);
  };

  // ---------------------------------------------------

  // const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  useEffect(() => {
    setOutput(null)
    setIsError(false)
  }, [language])

  const editorRef = useRef()

  const runCode = async () => {
    console.log('runCode');
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true)
      const {run:result} = await executeCode(language, sourceCode);
      console.log(result)
      setOutput(result.output.split("\n"))
      result.stderr ? setIsError(true) : setIsError(false)
    } catch (error) {  
      console.log(error);
      // toast({
      //       title: "An error occurred.",            
      //       description: error.message || "Unable to run code",
      //       status: "error",
      //       duration: 2500,
      // })
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------------------------------

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
            <h2 className="card-title text-fuchsia-400 font-courier mr-8">（テスト出力）</h2>
            <Output editorRef={editorRef} language={language} output={output} setOutput={setOutput} isError={isError} setIsError={setIsError}/>
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