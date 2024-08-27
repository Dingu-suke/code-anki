import React from 'react';


const RunButton = (props) => {
  const { runCode, isLoading } = props;

  return (
    <div>
      <button type="button"
        className='btn min-h-0 h-7 border border-black bg-black text-green-500 hover:bg-black hover:border-black hover:text-emerald-300 cursor-auto'
        style={{
          outline: 'none',
          pointerEvents: isLoading ? 'none' : 'auto' 
        }} 
        onClick={runCode}
      >
        {isLoading ? <div className='loading loading-spinner loading-xs' /> : '▷'}
      </button>
    </div>
  );
};

export default RunButton;