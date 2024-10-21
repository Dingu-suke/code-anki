import { Editor } from '@monaco-editor/react';
import React from 'react';

const RunCodeEditor = ({ value, onChange, language, onLanguageChange, editorRef }) => {
  
  const onMount = (editor) => {
    editorRef.current = editor;
  }

  return (
    <>
      <Editor
        height="30vh"
        theme="vs-dark"
        language={language}
        value={value}
        onChange={onChange}
        onMount={onMount}
        options={{
          fontSize: 14
        }}
      />
    </>
  );
};

export default RunCodeEditor;