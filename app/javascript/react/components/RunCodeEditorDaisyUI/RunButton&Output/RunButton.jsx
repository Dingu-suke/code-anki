import React, { useEffect, useState } from 'react';


const RunButton = (props) => {
  const { runCode, isLoading } = props;

  
  return (
    <div>
      <button type="button"
        className='btn min-h-0 h-7 border border-black bg-black text-green-500 hover:bg-black hover:border-black hover:text-emerald-300'
        style={{ 
          outline: 'none',
          pointerEvents: isLoading ? 'none' : 'auto' 
        }} 
        onClick={runCode}
      >
        {isLoading ? <div className='loading loading-spinner loading-xs' /> : '▷'}
      </button>
      {/* <div
        height="40vh"
        color={isError ? "red.500" : ""}
        p={2}
        border="1px solid"
        >
        {output ? output.map((line, i) => (
          <div key={i}>{line}</div>)) : "Run ▶️ to see the output here"}
      </div> */}
    </div>
  );
};

export default RunButton;
