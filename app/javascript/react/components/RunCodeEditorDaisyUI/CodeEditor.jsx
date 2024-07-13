import { Editor } from '@monaco-editor/react';
import React, { useRef, useState } from 'react';
import { CODE_SNIPPETS } from './constants';
import LanguageSelector from './LanguageSelector';
import Output from './Output';

const RunCodeEditor = () => {
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
            height="45vh"
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
export default RunCodeEditor;