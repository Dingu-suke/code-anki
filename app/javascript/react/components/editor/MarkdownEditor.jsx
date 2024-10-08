import React, { forwardRef, useCallback, useEffect, useMemo, useRef } from "react";
import SimpleMDE from "react-simplemde-editor";
// import "easymde/dist/easymde.min.css";e
// import { createGlobalStyle } from 'styled-components';

// const GlobalStyle = createGlobalStyle`
//   .custom-mde .EasyMDEContainer {
//     font-size: 16px;
//   }

//   .custom-mde .CodeMirror {
//     background-color: #2b2b2b;  // 背景色を黒に変更
//     color: #ffffff;  // デフォルトのテキスト色を白に変更
//   }

//   .custom-mde .editor-toolbar {
//     background-color: #474a4d;  // ツールバーの背景色を暗めのグレーに変更
//   }

//   .custom-mde .editor-toolbar button {
//     color: #bbbcde !important;  // ツールバーのアイコン色を白に変更
//   }

//   .custom-mde .editor-toolbar button:hover,
//   .custom-mde .editor-toolbar button.active {
//     background: #555555;  // ホバー時とアクティブ時の背景色
//   }

//   .custom-mde .CodeMirror-cursor {
//     border-left: 1px solid #ffffff;  // カーソルの色を白に変更
//   }

//   // マークダウンの各要素のスタイル
//   .custom-mde .cm-header { color: #ede4cd; }  // 見出し 練色
//   .custom-mde .cm-link { color: #bce2e8; }    // リンク 薄青
//   .custom-mde .cm-strong { color: #fdeff2; }  // 太字 薄桜
//   .custom-mde .cm-em { color: #e0ebaf; }      // イタリック 若芽色

//   // プレースホルダーのスタイル
//   .custom-mde .CodeMirror-placeholder {
//     color: #888888;  // プレースホルダーの色をグレーに
//   }

//   .custom-mde .editor-toolbar {
//     background-color: #333333;
//     border: none; // ツールバーのボーダーを削除
//   }

//   .custom-mde .CodeMirror {
//   background-color: #2b2b2b;
//   color: #ffffff;
//   border: none; // ボーダーを削除
//   }

//   .custom-mde .EasyMDEContainer {
//     font-size: 15px;
//   }

//   .custom-mde .CodeMirror {
//     background-color: #2b2b2b;
//     color: #ffffff;
//     border: none !important;
//     box-shadow: none !important;
//   }

//   .custom-mde .CodeMirror-focused {
//     outline: none !important;
//   }

//   .custom-mde .CodeMirror-scroll {
//     padding: 10px;
//   }

//   .custom-mde .editor-toolbar {
//     background-color: #474a4d;
//     border: none !important;
//     opacity: 1;
//   }

//   .custom-mde .editor-toolbar button {
//     color: #bbbcde !important;
//     border: none !important;
//   }

//   .custom-mde .editor-toolbar button:hover,
//   .custom-mde .editor-toolbar button.active {
//     background: #555555;
//     border: none !important;
//   }

//   .custom-mde .editor-statusbar {
//     display: none; // ステータスバーを非表示にする
//   }

//   // エディタ全体の外枠を削除
//   .custom-mde .EasyMDEContainer {
//     border: none !important;
//   }
// `;
export const QuestionEditor = React.forwardRef((props, ref) => {
  const { defaultValue, onBlur } = props;
  const editorRef = useRef(null);

  const options = useMemo(() => ({
    autofocus: false,
    spellChecker: false,
    minHeight: '200px',
    maxHeight: '320px',
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
      {/* <GlobalStyle /> */}
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
    maxHeight: '168px',
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
      {/* <GlobalStyle /> */}
      <SimpleMDE
        value={defaultValue}
        onBlur={handleBlur}
        getMdeInstance={handleEditorDidMount}
        options={options}
      />
    </div>
  );
})