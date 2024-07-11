import React from 'react';
import { useEffect, useState } from 'react';
import { executeCode } from '../../js/api';

const Output = (props) => {  
  console.log("hatena")
  const { editorRef, language } = props;
  // const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  useEffect(() => {
    setOutput(null)
    setIsError(false)
  }, [language])

  const runCode = async () => {
    console.log('runCode');
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true)
      const {run:result} = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"))
      result.stderr ? setIsError(true) : setIsError(false)
    } catch (error) {  
      console.log(error);
      // toast({
      //       title: "An error occurred.",            
      //       description: error.message || "Unable to run code",
      //       status: "error",
      //       duration: 2500,
      // })
    } finally {
      setIsLoading(false);
    }  
  };

  return (
    <div>
      <div mb={2} fontSize="lg">
        Output
      </div>
      <div className='btn' variant="outline" colorScheme="green" mb={4} isLoading={isLoading} onClick={runCode}>
        ▶
      </div >
      <div
        height="40vh"
        color={isError ? "red.500" : ""}
        p={2}
        border="1px solid"
        borderRadius={4}
        borderColor={
          isError ? "red.200" : "#223"}
        >
        {output ? output.map((line, i) => (
          <div key={i}>{line}</div>)) : "Click ▶️ to see the output here"}
      </div>
    </div>
  );
};

export default Output;
