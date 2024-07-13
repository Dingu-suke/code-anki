import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .custom-mde .EasyMDEContainer {
    font-size: 16px;
  }

  .custom-mde .CodeMirror {
    background-color: #2b2b2b;  // 背景色を黒に変更
    color: #ffffff;  // デフォルトのテキスト色を白に変更
  }

  .custom-mde .editor-toolbar {
    background-color: #474a4d;  // ツールバーの背景色を暗めのグレーに変更
  }

  .custom-mde .editor-toolbar button {
    color: #bbbcde !important;  // ツールバーのアイコン色を白に変更
  }

  .custom-mde .editor-toolbar button:hover,
  .custom-mde .editor-toolbar button.active {
    background: #555555;  // ホバー時とアクティブ時の背景色
  }

  .custom-mde .CodeMirror-cursor {
    border-left: 1px solid #ffffff;  // カーソルの色を白に変更
  }

  // マークダウンの各要素のスタイル
  .custom-mde .cm-header { color: #ede4cd; }  // 見出し 練色
  .custom-mde .cm-link { color: #bce2e8; }    // リンク 薄青
  .custom-mde .cm-strong { color: #fdeff2; }  // 太字 薄桜
  .custom-mde .cm-em { color: #e0ebaf; }      // イタリック 若芽色

  // プレースホルダーのスタイル
  .custom-mde .CodeMirror-placeholder {
    color: #888888;  // プレースホルダーの色をグレーに
  }

  .custom-mde .editor-toolbar {
    background-color: #333333;
    border: none; // ツールバーのボーダーを削除
  }

  .custom-mde .CodeMirror {
  background-color: #2b2b2b;
  color: #ffffff;
  border: none; // ボーダーを削除
  }

  .custom-mde .EasyMDEContainer {
    font-size: 15px;
  }

  .custom-mde .CodeMirror {
    background-color: #2b2b2b;
    color: #ffffff;
    border: none !important;
    box-shadow: none !important;
  }

  .custom-mde .CodeMirror-focused {
    outline: none !important;
  }

  .custom-mde .CodeMirror-scroll {
    padding: 10px;
  }

  .custom-mde .editor-toolbar {
    background-color: #474a4d;
    border: none !important;
    opacity: 1;
  }

  .custom-mde .editor-toolbar button {
    color: #bbbcde !important;
    border: none !important;
  }

  .custom-mde .editor-toolbar button:hover,
  .custom-mde .editor-toolbar button.active {
    background: #555555;
    border: none !important;
  }

  .custom-mde .editor-statusbar {
    display: none; // ステータスバーを非表示にする
  }

  // エディタ全体の外枠を削除
  .custom-mde .EasyMDEContainer {
    border: none !important;
  }

  
`;

const MarkdownEditor = (props) => {
  const onChange = (value) => {
    console.log(value);
  };

  const options = {
    autofocus: false,
    spellChecker: false,
    minHeight: '200px',
    maxHeight: '280px',
    placeholder: 'Type your here... ( You can use markdown. )',
    status: false,
  };

  return (
    <div className="custom-mde">
      <GlobalStyle />
      <SimpleMDE
        onChange={onChange}
        options={options}
      />
    </div>
  );
}

export default MarkdownEditor;