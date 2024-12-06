import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useRunCode } from "../../hooks/useRunCode";
import { EditorAndAnswer } from "../card/EditorAndAnswer";
import { MarkdownView } from "../editor/MarkdownView";
import Output from "../runCodeEditorDaisyUI/runButton-Output/Output";


export const PreviewCard = ({ previewCardList, card, setPreviewCard, moveToNextCard, moveToPreviousCard}) => {
  const [currentCardId, setCurrentCardId] = useState(card.id)
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
  } = useRunCode(currentCard.language);

  const { 
    runCode: runAnswerCode,
    editorRef: answerEditorRef,
    language: answerLanguage,
    output: answerOutput,
    setOutput: setAnswerOutput,
    isError: answerIsError,
    isLoading: answerIsLoading,
    setIsError: setAnswerIsError
  } = useRunCode(currentCard.language);

  const handleRunAnswerCode = () => {
    runAnswerCode();
    setActiveOutput('answer');
  };

  const toggleBlur2 =() => {
    setIsBlur(!isBlur);
  }

  return (
    <div className=" bg-gray-950">
      <div className="bg-slate-800 font-semibold text-lg grid grid-cols-3 gap-4 rounded-full">
        <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 font-semibold rounded-full rounded-r-lg flex items-center justify-center cursor-default border-r border-gray-700"
        onClick={moveToPreviousCard}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center justify-center truncate">
          {card.title}
        </div>
        <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 font-semibold rounded-full rounded-l-lg flex items-center justify-center cursor-default border-l border-gray-700"
        onClick={moveToNextCard}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <br />
      <div
          className="grid grid-cols-12 gap-4 mb-4"
        >
          <div className="col-span-6">
            <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded overflow-hidden">
              <div className="bg-slate-800 px-4 py-2 font-semibold">
                問題文
              </div>
              <div className="p-4 h-[calc(60vh-2rem)] overflow-auto">
                <MarkdownView bodyValue={card.body}></MarkdownView>
              </div>
            </div>
          </div>
          <div className="col-span-6 flex flex-col h-[calc(34vh-2rem)]">
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
          <div className="col-span-12">
            <EditorAndAnswer
              card={card} 
              runUserCode={handleRunUserCode}
              runAnswerCode={handleRunAnswerCode}
              userIsLoading={userIsLoading}
              answerIsLoading={answerIsLoading}
              userEditorRef={userEditorRef}
              answerEditorRef={answerEditorRef}
              setCurrentCardId={setCurrentCardId}
              toggleBlur2={toggleBlur2}
              isBlur={isBlur}
            />
          </div>
        </div>
    </div>
  );
};