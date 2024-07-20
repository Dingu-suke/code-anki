import React, { useEffect, useState } from 'react';

const Output = (props) => {
  const { editorRef, language, output, setOutput, isError, setIsError } = props;
  
  useEffect(() => {
    setOutput(null)
    setIsError(false)
  }, [language])

  return (
    <div>
        <textarea 
                  value={
                    output ? output.map(line => "   " + line).join('\n') :
                    "   Run ▷ to see the output here and check the code."
                  }
                  readOnly
                  style={{width: '100%', height: '200px'}}
                  className={`font-courier bg-zinc-900 focus:outline-none focus:border-2 ${
                    isError 
                    ? "font-courier text-red-500 bg-zinc-900 focus:outline-none border border-pink-800"
                    : output
                      ? "font-courier bg-zinc-900 text-violet-300 focus:outline-none focus:border-2 focus:border-fuchsia-800 border border-fuchsia-900"
                      : "text-green-400 focus:outline-none  border border-green-800"}`}

        >
        </textarea>
    </div>
  );
};

export default Output;
