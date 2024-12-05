import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useRunCode } from "../../hooks/useRunCode";
import Output from "../runCodeEditorDaisyUI/runButton&Output/Output";
import { EditorAndAnswer, EditorForAnswer, EditorForUser } from "../card/EditorAndAnswer";
import { EditorProvider } from '../../context/EditorProvider';


export const DrillContennt = ({ previewCardList, card, setPreviewCard, moveToNextCard, moveToPreviousCard}) => {
  const [currentCardId, setCurrentCardId] = useState(card?.id)
  const [bluredCards, setBluredCards] = useState(() => {
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

  return (
    <EditorProvider
                card={card}
                runUserCode={runUserCode}
                runAnswerCode={runAnswerCode}
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
        <div className="grid grid-cols-6 grid-rows-2 gap-4 mb-4">
            <div className="col-span-3 row-span-2">
              <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded overflow-hidden">
                <div className="bg-slate-800 px-4 py-2 font-semibold">
                  問題文
                </div>
                <div className="p-4 h-[calc(65vh-2rem)] overflow-auto">
                  <Markdown>{card?.body}</Markdown>
                </div>
              </div>
            </div>
            <div className="col-start-4 col-span-3 row-span-1">
                <div>
                  <div className="pb-1">
                    <EditorForUser /> {/* EditorProvider から呼び出し */}
                  </div>
                  <div className="pt-1">
                    <EditorForAnswer /> {/* EditorProvider から呼び出し*/}
                  </div>
                </div>
            </div>
            <div className="col-start-4 col-span-3 row-span-1 flex flex-col">
              {/* <div className="border border-slate-600 hover:border-cyan-600 hover:text-cyan-50 text-blue-950 mb-2 rounded shadow flex-grow overflow-auto">
                <div className="bg-slate-800 text-cyan-100 px-4 py-2 font-semibold">
                  備考･メモ
                </div>
                <div className="px-4 py-4">
                  <Markdown>{card?.remarks}</Markdown>
                </div>
              </div> */}
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
            </div>
          </div>
        </div>
      </EditorProvider>
  );
};