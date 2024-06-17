import React, { useState } from 'react';

const TextBox = () => {
  return (
    <div>
      <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
    </div>
  );
};

export default TextBox;