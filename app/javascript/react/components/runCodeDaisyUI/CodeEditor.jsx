import React from 'react';
import { Editor } from '@monaco-editor/react';
import { useRef, useState } from 'react';
import LanguageSelector from './LanguageSelector';
import { CODE_SNIPPETS } from './contents';
import Output from './Output';

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('javascript');
  
  const onSelect = (language) => {
    setValue(CODE_SNIPPETS[language]);
    setLanguage(language);
  };


  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  }

  return (
        <>
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            height="30vh"
            theme="vs-dark"
            language={language}
            defaultValue="// some comment"
            onMount={onMount}
            value={CODE_SNIPPETS[language]}
            onChange={(value) => setValue(value)
            }
            />
          <Output editorRef={editorRef} language={language} />
        </>

  );
};
export default CodeEditor;