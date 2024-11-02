import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useRunCode } from "../../hooks/useRunCode";
import Output from "../runCodeEditorDaisyUI/runButton&Output/Output";
import { EditorAndAnswer } from "../card/EditorAndAnswer";


export const DrillContennt = ({ previewCardList, card, setPreviewCard, moveToNextCard, moveToPreviousCard}) => {
  const [currentCardId, setCurrentCardId] = useState(card?.id)
  const currentCard = card

  const {
    runCode: runUserCode, 
    editorRef: userEditorRef, 
    language: userLanguage, 
    output: userOutput, 
    setOutput: setUserOutput,
    isError: userIsError, 
    isLoading: userIsLoading,
    setIsError: setUserIsError
  } = useRunCode(currentCard?.language);

  const { 
    runCode: runAnswerCode,
    editorRef: answerEditorRef,
    language: answerLanguage,
    output: answerOutput,
    setOutput: setAnswerOutput,
    isError: answerIsError,
    isLoading: answerIsLoading,
    setIsError: setAnswerIsError
  } = useRunCode(currentCard?.language);

  useEffect(() => {
    if (previewCardList && previewCardList.length > 0)
    {    
      setCurrentCardId
    }
    }, [previewCardList])

  const [activeOutput, setActiveOutput] = useState('user');
  const [outputHeight, setOutputHeight] = useState('130px');  // 初期高さを130pxに設定

  const handleRunUserCode = () => {
    runUserCode();
    setActiveOutput('user');
  };

  const handleRunAnswerCode = () => {
    runAnswerCode();
    setActiveOutput('answer');
  };

  return (
    <div className=" bg-gray-950">
      <br />
      <div
          className="grid grid-cols-6 gap-4 mb-4"
        >
          <div className="col-span-4">
            <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded overflow-hidden">
              <div className="bg-slate-800 px-4 py-2 font-semibold">
                問題文
              </div>
              <div className="p-4 h-[calc(30vh-2rem)] overflow-auto">
                <Markdown>{card?.body}</Markdown>
              </div>
            </div>
          </div>
          <div className="col-span-2 flex flex-col h-[calc(34vh-2rem)]">
            <div className="border border-slate-600 hover:border-cyan-600 hover:text-cyan-50 text-blue-950 mb-2 rounded shadow flex-grow overflow-auto">
              <div className="bg-slate-800 text-cyan-100 px-4 py-2 font-semibold">
                備考･メモ
              </div>
              <div className="px-4 py-4">
                <Markdown>{card?.remarks}</Markdown>
              </div>
            </div>
              <Output
                editorRef={activeOutput === 'user' ? userEditorRef : answerEditorRef}
                language={activeOutput === 'user' ? userLanguage : answerLanguage}
                output={activeOutput === 'user' ? userOutput : answerOutput}
                setOutput={activeOutput === 'user' ? setUserOutput : setAnswerOutput}
                isError={activeOutput === 'user' ? userIsError : answerIsError}
                setIsError={activeOutput === 'user' ? setUserIsError : setAnswerIsError}
                message={`Check the Codes here ▷`}
                distinguishText={`Output Of ${activeOutput === "user" ? " Your" : "Answer's"} Code`}
                activeOutput={activeOutput}
                height={outputHeight}
                outputHeight={outputHeight}
                setOutputHeight={setOutputHeight}
              />
          </div>
          <div className="col-span-6">
            <EditorAndAnswer
              card={card} 
              runUserCode={handleRunUserCode}
              runAnswerCode={handleRunAnswerCode}
              userIsLoading={userIsLoading}
              answerIsLoading={answerIsLoading}
              userEditorRef={userEditorRef}
              answerEditorRef={answerEditorRef}
              setCurrentCardId={setCurrentCardId}
            />
          </div>
        </div>
    </div>
  );
};