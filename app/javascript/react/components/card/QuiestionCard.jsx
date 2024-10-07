import React from 'react';
import { QuestionEditor } from '../editor/MarkdownEditor';

const QuestionCard = ({ editorRef, defaultValue, onBlur }) => {

  return(
    <div className="card shadow-xl bg-sky-900 card-bordered border-cyan-500 h-full">
      <div className="card-body flex flex-col">
        <h2 className="card-title text-indigo-200 font-courier mr-9">問題文</h2>
        <div className="flex-grow overflow-auto">
          <QuestionEditor ref={editorRef} defaultValue={defaultValue} onBlur={onBlur}/>
        </div>
      </div>
    </div>
  ) 
};
export default QuestionCard