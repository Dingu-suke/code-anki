import { useEffect, useRef, useState } from "react";
import { executeCode } from "../components/RunCodeEditorDaisyUI/api";

export const useRunCode = (language) => {
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const editorRef = useRef(null)
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    console.log('runCode');
    console.log(editorRef);
    if (!editorRef.current) return;
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true)
      const {run:result} = await executeCode(language, sourceCode);
      console.log(result)
      setOutput(result.output.split("\n"))
      result.stderr ? setIsError(true) : setIsError(false)
      console.log(output)
    } catch (error) {  
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setOutput(null)
    setIsError(false)
  }, [language])
  return {runCode, isLoading, output, setOutput, editorRef, isError, setIsError}
}