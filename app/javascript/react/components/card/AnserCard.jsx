import React from 'react';
import MonacoEditor from '../Editor/MonacoEditor';

const AnswerCard = () => {
  return(
    <>
        <div className="card shadow-xl">
          <div className="card-body">
            <h2 className="card-title">カードの裏 [解答例]</h2>
              <label className="form-control w-full ">
                <textarea type="text" placeholder="解説や備考など" rows="20" className="input input-bordered w-full max-w-xs" />
              </label>
              <p>言語:Ruby</p>
            <MonacoEditor />
          </div>
        </div>
    </>
  ) 
};
export default AnswerCard