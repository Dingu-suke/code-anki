import React, { useState, useEffect } from 'react';
import MonacoEditor from './MonacoEditor'; // MonacoInsert コンポーネントのインポート

const MonacoInsert = () => {
  const [inputText, setInputText] = useState('');
  const [showEditor, setShowEditor] = useState(false);

  /* ↓state変数を定義 */
  const [text, setText] = useState("");

  return (
    
    <div className="App">
      {/* ↓value属性にstate変数「text」を指定 */}
      <input value={text} />
      
      {/* ↓state変数「text」を表示する */}
      <p>{inputText}</p>
    </div>
  );
};

export default MonacoInsert;
