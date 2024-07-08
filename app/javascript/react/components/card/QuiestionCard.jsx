import React, { useState } from 'react';
import MonacoEditor from '../Editor/MonacoEditor';

const QuestionCard = (props) => {
  const {value, onChange} = props;
  const[questionText, setQuestionText] = useState('');
  const[editorContent, setEditorContent] = useState('');

  const writingCode = (value) => {
    setEditorContent(value);
  };
  return(
    <>
        <div className="card shadow-xl">
          <div className="card-body">
            <h2 className="card-title">カードの表 [問題]</h2>
              <label className="form-control w-full max-w-xs">
                <input type="text" placeholder="問題文   (例:以下のコードを書き換えましょう。)" className="input input-bordered w-full max-w-xs" />
              </label>
              <p>言語:Ruby</p>
            <MonacoEditor value={editorContent} 
                          onChange={setEditorContent}
                          language="ruby"
                          />
          </div>
        </div>
    </>
  ) 
};
export default QuestionCard