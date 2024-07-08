import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MonacoEditor from '../Editor/MonacoEditor';

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
function CardForm() {
  const [title, setTitle] = useState('');
  const [answer, setAnswer] = useState('');
  const [remarks, setRemarks] = useState('');
  const [editorContent, setEditorContent] = useState('');



  useEffect(() => {
    console.log("title Updated:", title);
  }, [title]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { 
      title: title,
      body: editorContent,
      answer: answer,
      remarks: remarks };

    try {
      const response = await axios.post('/cards', { card: formData });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl min-w-0 m-[30px] p-[20px]">
      <div className="card-body ">
        <h1 className="card-title">カード作成</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <h2 className="form-label">カードのタイトル</h2>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="form-control textarea textarea-bordered textarea-xs w-full max-w-xs"
            />
          </div>
          <div className="flex">
            <div className="container">
              <label className="form-label">コードブロック</label>
              <MonacoEditor
              value={editorContent}
              onChange={newValue => setEditorContent(newValue)}
              language="ruby"
            />
            </div>
            <div className="container">
              <label className="form-label">コードの解答</label>
              <textarea
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                className="form-control textarea textarea-bordered textarea-xs w-full max-w-xs"
              />
            </div>
          </div>

          <div>
            <label className="form-label">備考</label>
            <textarea
              value={remarks}
              onChange={e => setRemarks(e.target.value)}
              className="form-control textarea textarea-bordered textarea-lg w-full w-2/3"
            />
          </div>

          <button type="submit" className="btn btn-outline btn-info">保存する</button>
        </form>
      </div>
    </div>
  );
}

export default CardForm;
