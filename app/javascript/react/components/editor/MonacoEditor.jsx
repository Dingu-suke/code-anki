// app/javascript/react/components/MonacoEditor.jsx
import React from 'react';
import Editor from '@monaco-editor/react';

const MonacoEditor = ({ value, onChange, language }) => {
  
  
  return (
    <Editor
      height="33vh"
      theme="vs-dark"
      language={language || "javascript"}
      defaultValue={value}
      onChange={(onChangeValue) => onChange(onChangeValue)}
      options={{
        fontSize: 16
      }
    }
    />
  );
};
// memo 言語情報はpropsで受け取れば動的にできそう
// memo onChange={onChange} から onChange={(onChangeValue) => onChange(onChangeValue)}
export default MonacoEditor;