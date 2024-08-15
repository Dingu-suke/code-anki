import React, { useEffect, useState } from "react"
import Markdown from "react-markdown"
import { useRunCode } from "../../hooks/useRunCode"
import '../../markdown.css'
import Output from "../RunCodeEditorDaisyUI/RunButton&Output/Output"
import { EditorAndAnswer } from "./EditorAndAnswer"

export const Drill = () => {
  const [currentDeck, setCurrentDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const currentCard = cards[currentCardIndex];

  // useEffect(() => {
  //   if (decks && decks.length > 0) {
  //     const deck = decks.find(d => d.id === parseInt(deckId));
  //     if (deck) {
  //       setCurrentDeck(deck);
  //       setCards(deck.cards);
  //     }
  //   }
  // }, [decks, deckId]);

  const { 
    runCode: runUserCode, 
    editorRef: userEditorRef, 
    language: userLanguage, 
    output: userOutput, 
    setOutput: setUserOutput, 
    isError: userIsError, 
    isLoading: userIsLoading, 
    setIsError: setUserIsError
  } = useRunCode(currentCard?.language || 'javascript');

  const { 
    runCode: runAnswerCode, 
    editorRef: answerEditorRef, 
    language: answerLanguage, 
    output: answerOutput, 
    setOutput: setAnswerOutput, 
    isError: answerIsError, 
    isLoading: answerIsLoading, 
    setIsError: setAnswerIsError
  } = useRunCode(currentCard?.language || 'javascript');

  const [activeOutput, setActiveOutput] = useState('user');
  const [outputHeight, setOutputHeight] = useState('130px');

  const handleRunUserCode = () => {
    runUserCode();
    setActiveOutput('user');
  };

  const handleRunAnswerCode = () => {
    runAnswerCode();
    setActiveOutput('answer');
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePreviousCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentCard) {
    return <div className="text-cyan-200">No cards available for this deck.</div>;
  }

  return (
    <div className="min-h-screen p-4 flex flex-col bg-gray-950">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white">{currentDeck?.name}</h2>
        <p className="text-gray-400">Card {currentCardIndex + 1} of {cards.length}</p>
      </div>
      <div className="grid grid-cols-6 gap-4 mb-8">
        <div className="col-span-4">
          <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded overflow-hidden">
            <div className="bg-slate-800 px-4 py-2 font-semibold">
              {currentCard.title}
            </div>
            <div className="p-4 h-[calc(45vh-2rem)] overflow-auto">
              <Markdown>{currentCard.body}</Markdown>
            </div>
          </div>
        </div>
        <div className="col-span-2 flex flex-col h-[calc(49.6vh-2rem)]">
          <div className="border border-slate-600 hover:border-cyan-600 hover:text-cyan-50 text-blue-950 mb-2 rounded shadow flex-grow overflow-auto">
            <div className="bg-slate-800 text-cyan-100 px-4 py-2 font-semibold">
              備考･メモ
            </div>
            <div className="px-4 py-4">
              <Markdown>{currentCard.remarks}</Markdown>
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
            card={currentCard} 
            runUserCode={handleRunUserCode}
            runAnswerCode={handleRunAnswerCode}
            userIsLoading={userIsLoading}
            answerIsLoading={answerIsLoading}
            userEditorRef={userEditorRef}
            answerEditorRef={answerEditorRef}
          />
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousCard}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Previous Card
        </button>
        <button
          onClick={handleNextCard}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Next Card
        </button>
      </div>
    </div>
  );
};