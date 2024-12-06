import React, { useEffect } from 'react';

const Output = (props) => {
  const { output, isError, message, distinguishText, outputType, activeOutput, height, outputHeight, setOutputHeight } = props;

  const titleText = distinguishText || (message ? "Output" : "Code Output");

  useEffect(() => {
    if (isError) {
      setOutputHeight? setOutputHeight("600px"): ""
    } else {
      setOutputHeight? setOutputHeight("600px"): ""
    }
  }, [isError, output, setOutputHeight])

  const getBorderColor = () => {
    if (isError) return "border-red-900";
    if (output) {
      return activeOutput === 'answer' ? "border-purple-700" : "border-indigo-700";
    }
    return "border-green-700";
  };

  const getTextColor = () => {
    if (isError) return "text-red-200";
    if (output) {
      return activeOutput === 'answer' ? "text-violet-200" : "text-cyan-200";
    }
    return "text-green-200";
  };

  return (
    <div className={`border rounded-md overflow-hidden bg-black ${getBorderColor()} flex flex-col h-full`}>
      <div className={`
        font-mono text-sm pl-4 py-2
        bg-slate-900 ${getTextColor()}
        focus:outline-none 
      `}>
        {titleText}
      </div>

      <div className="h-full">
        <textarea 
          value={
            output 
              ? output.join('\n')
              : message 
                ? message 
                : "Run ▷ to see the output here and check the code."
          }
          readOnly
          className={`
            font-mono text-sm p-2
            bg-black
            ${isError 
              ? "text-red-400"
              : output 
                ? activeOutput === 'answer'? "text-purple-400" : "text-cyan-400"
                : "text-green-400"
            }
            focus:outline-none
            border-t ${getBorderColor()}
            flex-grow
            resize-none
            w-full
          `}
        />
      </div>
    </div>
  );
};

export default Output;