import React, { useState } from "react"
import Markdown from "react-markdown"
import { useRunCode } from "../../hooks/useRunCode"
import '../../../../../app/assets/stylesheets/application.tailwind.css'
// import '@/app/assets/stylesheets/application.tailwind.css'
import Output from "../runCodeEditorDaisyUI/runButton&Output/Output"
import { EditorAndAnswer } from "../card/EditorAndAnswer"

const initialCards = [
  {id: 1, title: 'カード1',
    body: '# だまれ小僧。**お前にさんが救えるか**',
    answer: `function greet(name) {\n\t//console.log("Hello, " + name + "!");\n}\n\ngreet("Javascript");\n`, 
    language: 'javascript', 
    remarks:'JSしか勝たん' 
  },

]
export const Drill = () => {
  const [cards, setCards] = useState(initialCards)
  const [currentCardId, setCurrentCardId] = useState(cards[0].id)
  const currentCard = cards.find(card => card.id === currentCardId)
  
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
    <div className=" bg-gray-950">

      {cards.map((card) => (
        <div
          key={card.id}
          className="grid grid-cols-6 gap-4 mb-8"
        >
          <div className="col-span-4">
            <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded overflow-hidden">
              <div className="bg-slate-800 px-4 py-2 font-semibold">
                {card.title}
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
            {card.id === currentCardId && (
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
            )}
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
      ))}
    </div>
  );
};