// app/javascript/react/components/MonacoEditor.jsx
import React from 'react';
import Editor from '@monaco-editor/react';

const MonacoEditor = () => {
  return (
    <Editor
      height="30vh"
      theme="vs-dark"
      defaultLanguage="ruby"
      defaultValue="# ruby"
    />
  );
};

export default MonacoEditor;