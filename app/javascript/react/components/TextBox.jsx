import React, { useState } from 'react';
import MonacoEditor from './Editor/MonacoEditor';

const TextBox = () => {
  const [text, setText] = useState("");
  const [showEditor, setShowEditor] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    if (value.includes('```')) {
      setShowEditor(true);
    } else {
      setShowEditor(false);
    }
  };

  return (
    <div>
      <>
        <label className="form-control w-full max-w-xs">
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </label>
      </>
      {showEditor && (
        <MonacoEditor/>
      )}
    </div>
  );
}
export default TextBox;