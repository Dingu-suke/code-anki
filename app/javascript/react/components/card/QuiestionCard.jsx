import React from 'react';
import { QuestionEditor, RemarksEditor } from '../editor/MarkdownEditor';

const QuestionCard = ({ editorRef, defaultValue, onBlur, remarksEditorRef, remarksDefaultValue, remarksOnBlur }) => {

  return(
    <div className="card shadow-xl bg-sky-900 card-bordered border-cyan-500 h-full">
      <div className="card-body flex flex-col">
        <h2 className="card-title text-indigo-200 font-courier mr-9">問題文</h2>
        <div className="flex-grow ove2rflow-auto mb-2">
          <QuestionEditor ref={editorRef} defaultValue={defaultValue} onBlur={onBlur}/>
        </div>
        <h2 className="card-title text-fuchsia-200 font-courier">備考･メモ</h2>
          <RemarksEditor ref={remarksEditorRef} defaultValue={remarksDefaultValue} onBlur={remarksOnBlur}/>
      </div>
    </div>
  ) 
};
export default QuestionCard