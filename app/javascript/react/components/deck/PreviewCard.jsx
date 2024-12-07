import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useRunCode } from "../../hooks/useRunCode";
import { DiffEditorContent, EditorAndAnswer, EditorForAnswer, EditorForUser } from "../card/EditorAndAnswer";
import { MarkdownView } from "../editor/MarkdownView";
import Output from "../runCodeEditorDaisyUI/runButton-Output/Output";
import { EditorProvider } from "../../context/EditorProvider";
import { activeTabClassOrange, inactiveTabClassOrange, tabClass } from "../../tabStylesAndFunc/styleClass";


export const PreviewCard = ({ previewCardList, card, setPreviewCard, moveToNextCard, moveToPreviousCard}) => {
  const [currentCardId, setCurrentCardId] = useState(card.id)
  const [activeTab, setActiveTab] = useState('cardbody')
  const [activeOutput, setActiveOutput] = useState('user');
  const [outputHeight, setOutputHeight] = useState('120px');
  const [bluredCards  , setBluredCards]   = useState(() => {
    if (!previewCardList) return {};
    
    // 全てのカードのIDに対して 初期設定 true (ぼかす)
    return previewCardList.reduce((acc, card) => ({
      ...acc,
      [card.id]: true
    }), {});
  });

  const handleRunUserCode = () => {
    runUserCode();
    setActiveOutput('user');
  };

  const handleRunAnswerCode = () => {
    runAnswerCode();
    setActiveOutput('answer');
  };

  const handleTabChange = (tabName, updateFunc) => {
    updateFunc(tabName);
  };

  useEffect(() => {
    console.log("activeOutput", activeOutput);
  }, [activeOutput])

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

  const toggleBlur2 =() => {
    setIsBlur(!isBlur);
  }
  
  const toggleBlur = (cardId) => {
    setBluredCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  return (
    <div className=" bg-gray-950">
      <div className="bg-slate-800 font-semibold text-lg grid grid-cols-12 gap-4 rounded-full">
        <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 font-semibold rounded-full rounded-r-lg flex items-center justify-center cursor-default border-r border-gray-700 col-span-3"
        onClick={moveToPreviousCard}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-6 col-span-3">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center justify-center truncate col-span-6">
          {card.title}
        </div>
        <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 font-semibold rounded-full rounded-l-lg flex items-center justify-center cursor-default border-l border-gray-700 col-span-3"
        onClick={moveToNextCard}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-6 col-span-3">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <br />      
      <EditorProvider
              card={card}
              runUserCode={handleRunUserCode}
              runAnswerCode={handleRunAnswerCode}
              userIsLoading={userIsLoading}
              answerIsLoading={answerIsLoading}
              userEditorRef={userEditorRef}
              answerEditorRef={answerEditorRef}
              setCurrentCardId={setCurrentCardId}
              editorHeight="25vh"
              diffEditorHeight="60vh"
              bluredCards={bluredCards}
              toggleBlur={toggleBlur}
              toggleBlur2={toggleBlur2}
              // isBlur={isBlur}
            >
        <div className=" bg-gray-950">
          <div className=" gap-4 mb-4">
            <div className="">
              <div className="w-full">
                <div role="tablist" className="flex border-b border-yellow-800">
                  <button
                  role="tab"
                    className={`${tabClass} ${activeTab === 'cardbody' ? activeTabClassOrange : inactiveTabClassOrange} cursor-auto h-7 text-sm`}
                    onClick={() => handleTabChange('cardbody', setActiveTab)}
                    aria-selected={activeTab === 'cardbody'}
                    aria-controls="cardbody-panel"
                  >
                    問題文
                  </button>
                  <button
                    role="tab"
                    className={`${tabClass} ${activeTab === 'output' ? activeTabClassOrange : inactiveTabClassOrange} cursor-auto h-7 text-sm `}
                    onClick={() => handleTabChange('output', setActiveTab)}
                    aria-selected={activeTab === 'output'}
                    aria-controls="output-panel"
                  >
                    出力
                  </button>
                  <button
                    role="tab"
                    className={`${tabClass} ${activeTab === 'diff' ? activeTabClassOrange : inactiveTabClassOrange} cursor-auto h-7 text-sm `}
                    onClick={() => handleTabChange('diff', setActiveTab)}
                    aria-selected={activeTab === 'diff'}
                    aria-controls="diff-panel"
                  >
                    差分
                  </button>
                </div>

                {/* 問題文タブで表示する内容 */}
                <div className="bg-slate-950 border-x border-b border-yellow-800 rounded-b-md">
                  <div
                    role="tabpanel"
                    id="cardbody-panel"
                    className={`p-6 ${activeTab === 'cardbody' ? '' : 'hidden'}`}
                  >
                    <div className="grid grid-cols-2 grid-rows-2 gap-4">
                      <div className="col-start-1 col-span-1 row-start-1 row-span-2">
                        <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded h-[calc(71vh-2rem)] flex flex-col overflow-y-scroll">
                          <div className="bg-slate-800 px-4 py-2 font-semibold sticky top-0 z-10">
                            {card?.title}
                          </div>
                          <div className="p-4 h-overflow-auto h-[calc(100%-2.5rem)]">                        
                            <MarkdownView bodyValue={card?.body} />
                          </div>
                        </div>
                      </div>
                      <div className="col-start-2 col-span-1 row-start-1 row-span-1">
                        <EditorForUser /> {/* EditorProvider useContex を使った呼び出し */}
                      </div>
                      <div className="col-start-2 col-span-1 row-start-2 row-span-1">
                        <EditorForAnswer /> {/* EditorProvider useContext を使った呼び出し*/}
                      </div>
                    </div>
                  </div>

                  {/* 出力タブタブで表示する内容 */}
                  <div
                    role="tabpanel"
                    id="output-panel"
                    className={`p-6 ${activeTab === 'output' ? '' : 'hidden'}`}
                  >
                    <div className="grid grid-cols-2 grid-rows-2 gap-4">
                      <div className="col-start-1 col-span-1 row-start-1 row-span-2">
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
                          />
                      </div>
                      <div className="col-start-2 col-span-1 row-start-1 row-span-1">
                        <EditorForUser /> {/* EditorProvider useContex を使った呼び出し */}
                      </div>
                      <div className="col-start-2 col-span-1 row-start-2 row-span-1">
                        <EditorForAnswer /> {/* EditorProvider useContext を使った呼び出し*/}
                      </div>
                    </div>
                  </div>
                  <div
                    role="diff"
                    id="diff-panel"
                    className={`p-6 ${activeTab === 'diff' ? '' : 'hidden'}`}
                  >
                    <DiffEditorContent /> {/* EditorProvider useContext を使った呼び出し*/}
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </EditorProvider>
  </div>
  );
};