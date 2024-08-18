import React, { useState, useEffect } from "react"
import Markdown from "react-markdown"
import Output from "../RunCodeEditorDaisyUI/RunButton&Output/Output";
import { useRunCode } from "../../hooks/useRunCode";
import { SentenceAndAnswer } from "./SentenceAndAnswer";

const initialCards = [
  {id: 1, title: 'カード1',
    body: '# だまれ小僧。**お前にさんが救えるか**',
    answer: `function greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Javascript");\n`, 
    language: 'javascript', 
    remarks:'JSしか勝たん' 
  },

]
export const CheckCard = () => {
  const [cards, setCards] = useState(initialCards)
  const [currentCardId, setCurrentCardId] = useState(cards[0].id)
  const currentCard = cards.find(card => card.id === currentCardId)
  const [activeTab, setActiveTab] = useState('sentence')

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
    <div className="min-h-screen p-4 flex flex-col bg-gray-950">
      {cards.map((card) => (
        <div
          key={card.id}
          className="gap-4 mb-8"
        >
          <div className="col-span-6">
            <SentenceAndAnswer
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
      ))}
    </div>
  );
};