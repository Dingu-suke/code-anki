import React, { useState } from 'react';
import MonacoEditor from '../Editor/MonacoEditor';
import MarkdownEditor from '../Editor/MarkddownEditor';

const QuestionCard = (props) => {
  const {value, onChange} = props;
  const[questionText, setQuestionText] = useState('');
  const[editorContent, setEditorContent] = useState('');

  const writingCode = (value) => {
    setEditorContent(value);
  };
  return(
    <>
        <div className="card shadow-xl bg-sky-900">
          <div className="card-body ">
            <h2 className="card-title text-indigo-200 font-courier bg-sky-900">Question Prompt</h2>
            <MarkdownEditor />
          </div>
        </div>
    </>
  ) 
};
export default QuestionCard