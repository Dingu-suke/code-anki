import { Editor } from '@monaco-editor/react';
import React, { useRef } from 'react';
// import { CODE_SNIPPETS } from './constants';
// import LanguageSelector from './LanguageSelector';
import Output from './RunButton&Output/Output';

const RunCodeEditor = ({ value, onChange, language, onLanguageChange, editorRef }) => {

  // const onSelect = (newLanguage) => {
  //   onLanguageChange(newLanguage);
  //   onChange(CODE_SNIPPETS[newLanguage]);
  // };
  

  const onMount = (editor) => {
    editorRef.current = editor;
  }

  return (
    <>
      {/* <LanguageSelector language={language} onSelect={onSelect} /> */}
      <Editor
        height="45vh"
        theme="vs-dark"
        language={language}
        value={value}
        onChange={onChange}
        onMount={onMount}
      />
      {/* <Output editorRef={editorRef} language={language} /> */}
    </>
  );
};

export default RunCodeEditor;