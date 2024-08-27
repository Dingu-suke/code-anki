import React, { useState, useEffect } from "react"
import Markdown from "react-markdown"
import { useRunCode } from "../../hooks/useRunCode";
import Output from "../RunCodeEditorDaisyUI/RunButton&Output/Output";
import { EditorAndAnswer } from "./EditorAndAnswer";


// const initialCards = [
//   {id: 900, title: 'タイトル',
//     body: '',
//     answer: ``, 
//     language: 'javascript', 
//     remarks:'' 
//   },
// ]

const initialCard = {
  id: 20, title: 'タイトル10',
  body: '',
  answer: ``, 
  language: 'javascript', 
  remarks:''
}

export const PreviewCard = ({ previewCardList, card, setPreviewCard, moveToNextCard, moveToPreviousCard}) => {
  // const [cards, setCards] = useState(initialCards)
  // const [card, setCard] = useState(initialCard)
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

  const prev = () => {
    console.log("prev")
  }
  const next = () => {
    console.log("next")
  }

  return (
    <div className=" bg-gray-950">
      <div className="bg-slate-800 font-semibold text-lg grid grid-cols-3 gap-4 rounded-full">
        <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 font-semibold rounded-full rounded-r-lg flex items-center justify-center cursor-default"
        onClick={moveToPreviousCard}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center justify-center truncate">
          {card.title}
        </div>
        <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 font-semibold rounded-full rounded-l-lg flex items-center justify-center cursor-default"
        onClick={moveToNextCard}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <br />
      <div
          className="grid grid-cols-6 gap-4 mb-8"
        >
          <div className="col-span-4">
            <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded overflow-hidden">
              <div className="bg-slate-800 px-4 py-2 font-semibold">
                問題文
              </div>
              <div className="p-4 h-[calc(30vh-2rem)] overflow-auto">
                <Markdown>{card.body}</Markdown>
              </div>
            </div>
          </div>
          <div className="col-span-2 flex flex-col h-[calc(34vh-2rem)]">
            <div className="border border-slate-600 hover:border-cyan-600 hover:text-cyan-50 text-blue-950 mb-2 rounded shadow flex-grow overflow-auto">
              <div className="bg-slate-800 text-cyan-100 px-4 py-2 font-semibold">
                備考･メモ
              </div>
              <div className="px-4 py-4">
                <Markdown>{card.remarks}</Markdown>
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