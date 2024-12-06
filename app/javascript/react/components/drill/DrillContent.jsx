import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { EditorProvider } from '../../context/EditorProvider';
import { useRunCode } from "../../hooks/useRunCode";
import { activeTabClassOrange, inactiveTabClassOrange, tabClass } from "../../tabStylesAndFunc/styleClass";
import { DiffEditorContent, EditorForAnswer, EditorForUser } from "../card/EditorAndAnswer";
import Output from "../runCodeEditorDaisyUI/runButton-Output/Output";

export const DrillContennt = ({ previewCardList, card, setPreviewCard, moveToNextCard, moveToPreviousCard}) => {
  const [currentCardId, setCurrentCardId] = useState(card?.id)
  const [activeTab,     setActiveTab]     = useState('cardbody')
  const [bluredCards  , setBluredCards]   = useState(() => {
    if (!previewCardList) return {};
    
    // 全てのカードのIDに対して 初期設定 true (ぼかす)
    return previewCardList.reduce((acc, card) => ({
      ...acc,
      [card.id]: true
    }), {});
  });

  const currentCard = card

  // デッキ変更時に更新
  useEffect(() => {
    if (!previewCardList) return;
    const initialState = previewCardList.reduce((acc, card) => ({
      ...acc,
      [card.id]: true
    }), {});
    setBluredCards(initialState);
  }, [previewCardList]);

  // カードごとにぼかしを制御する
  const toggleBlur = (cardId) => {
    setBluredCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const handleTabChange = (tabName, updateFunc) => {
    updateFunc(tabName);
  };

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
  const [outputHeight, setOutputHeight] = useState('120px');  // 初期高さを130pxに設定

  const handleRunUserCode = () => {
    runUserCode();
    setActiveOutput('user');
  };

  const handleRunAnswerCode = () => {
    runAnswerCode();
    setActiveOutput('answer');
  };

  useEffect(() => {
    console.log("activeOutput", activeOutput);
  }, [activeOutput])

  return (
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
                bluredCards={bluredCards}
                toggleBlur={toggleBlur}
                // toggleBlur2={toggleBlur2}
                // isBlur={isBlur}
              >
      <div className=" bg-gray-950">
        <br />
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
                      <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded overflow-hidden h-full">
                        <div className="bg-slate-800 px-4 py-2 font-semibold">
                          {card?.title}
                        </div>
                        <div className="p-4 h-overflow-auto h-[calc(100%-2.5rem)]">
                          <Markdown>{card?.body}</Markdown>
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
                  <DiffEditorContent />
                </div>
              </div>
          </div>
          </div>
          <div className="">
        </div>
        <div className="col-span-6">
        </div>
      </div>
    </div>
  </EditorProvider>
  );
};