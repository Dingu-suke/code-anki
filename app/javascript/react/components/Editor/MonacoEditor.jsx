// app/javascript/react/components/MonacoEditor.jsx
import React from 'react';
import Editor from '@monaco-editor/react';

const MonacoEditor = () => {
  
  return (
    <Editor
      fontSize="20px"
      height="25vh"
      theme="vs-dark"
      defaultLanguage="ruby"
      defaultValue=""
      options={{
        fontSize: 17
      }
    }
    />
  );
};
// memo 言語情報はpropsで受け取れば動的にできそう

export default MonacoEditor;