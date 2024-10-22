import React, { forwardRef, useCallback, useEffect, useMemo, useRef } from "react";
import SimpleMDE from "react-simplemde-editor";

export const QuestionEditor = React.forwardRef((props, ref) => {
  const { defaultValue, onBlur } = props;
  const editorRef = useRef(null);

  const options = useMemo(() => ({
    autofocus: false,
    spellChecker: false,
    minHeight: '200px',
    maxHeight: '220px',
    placeholder: 'Type here... ( You can use markdown. )',
    status: false,
    renderingConfig: {
      singleLineBreaks: false,
      codeSyntaxHighlighting: true,
    },
    toolbar: ["bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "link", "image", "|", "code", "preview", "side-by-side", "|", "guide" ],
  }), []);

  const handleEditorDidMount = useCallback((editor) => {
    editorRef.current = editor;
  }, []);  
    
  useEffect(() => {
    if (ref) {
      ref.current = {
        getValue: () => editorRef.current ? editorRef.current.value() : '',
        setValue: (value) => {
          if (editorRef.current) {
            editorRef.current.value(value);
          }
        }
      };
    }
  }, [ref]);

  const handleBlur = useCallback(() => {
    if (onBlur && editorRef.current) {
      onBlur(editorRef.current.value());
    }
  }, [onBlur])

  return (
    <div className="custom-mde">
      <SimpleMDE
        value={defaultValue}
        onBlur={handleBlur}
        getMdeInstance={handleEditorDidMount}
        options={options}
      />
    </div>
  );
})

export const RemarksEditor = React.forwardRef((props, ref) => {
  const { defaultValue, onBlur } = props;
  const editorRef = useRef(null);

  const options = useMemo(() => ({
    autofocus: false,
    spellChecker: false,
    minHeight: '130px',
    maxHeight: '130px',
    placeholder: 'Type here... ( You can use markdown. )',
    status: false,
    renderingConfig: {
      singleLineBreaks: false,
      codeSyntaxHighlighting: true,
    },
    toolbar: ["bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "link", "image", "|", "code", "preview", "side-by-side", "|", "guide" ],
  }));

  const handleEditorDidMount = useCallback((editor) => {
    editorRef.current = editor;
  }, []);  
    
  useEffect(() => {
    if (ref) {
      ref.current = {
        getValue: () => editorRef.current ? editorRef.current.value() : '',
        setValue: (value) => {
          if (editorRef.current) {
            editorRef.current.value(value);
          }
        }
      };
    }
  }, [ref]);

  const handleBlur = useCallback(() => {
    if (onBlur && editorRef.current) {
      onBlur(editorRef.current.value());
    }
  }, [onBlur])

  return (
    <div className="custom-mde">
      <SimpleMDE
        value={defaultValue}
        onBlur={handleBlur}
        getMdeInstance={handleEditorDidMount}
        options={options}
      />
    </div>
  );
})