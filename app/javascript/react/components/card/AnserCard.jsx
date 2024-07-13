import React from 'react';
import MonacoEditor from '../Editor/MonacoEditor';
import MarkdownEditor from '../Editor/MarkddownEditor';
import RunCodeEditor from '../RunCodeEditorDaisyUI/CodeEditor';

export const Answer = (props) => {
  const {} = props;
  return(
    <>
        <div className="card shadow-xl bg-purple-900">
          <div className="card-body">
            <h2 className="card-title text-fuchsia-400 font-courier">Answer Code Prompt</h2>
            <RunCodeEditor />
          </div>
        </div>
    </>
  ) 
};

export const Remarks = () => {
  return (
    <>
      <div className="card shadow-xl  bg-purple-900">
        <div className="card-body">
          <h2 className="card-title text-fuchsia-400 font-courier">Remarks Prompt</h2>
            <MarkdownEditor />
        </div>
      </div>
    </>
  )
}
