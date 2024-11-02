import React, { useCallback, useEffect, useState } from 'react';
import { DrillNavi } from './DrillNavi';
import { CheckedCards } from '../deck/ChekedCards';
import { DrillContennt } from './DrillContent';

export const DrillShow = ({selectedDrill}) => {

  const [previewCard, setPreviewCard] = useState(selectedDrill && selectedDrill.cards[0])
  const [checkedCards, setCheckedCards] = useState(selectedDrill?.cards)

  const initialCard = {
    id: 9999999999999, title: 'タイトル',
    body: '',
    answer: ``, 
    language: 'javascript', 
    remarks:'' 
  }
  
  useEffect(() => {
    setPreviewCard(selectedDrill?.cards[0])
  }, [selectedDrill])

  const findCardIndex = useCallback(() => {
    return checkedCards.findIndex(card => card?.id === previewCard?.id);
  }, [checkedCards, previewCard]);

  const moveToNextCard = useCallback(() => {
    const currentIndex = findCardIndex();
    if (currentIndex < checkedCards.length - 1) {
      previewCard?.id === initialCard.id
      ? setPreviewCard(checkedCards[checkedCards.length - 1]) : setPreviewCard(checkedCards[currentIndex + 1]);
    }
  }, [checkedCards, findCardIndex]);

  const moveToPreviousCard = useCallback(() => {
    const currentIndex = findCardIndex();
    if (currentIndex > 0) {
      previewCard?.id === initialCard.id
      ? setPreviewCard(checkedCards[0]) : setPreviewCard(checkedCards[currentIndex - 1])
    }
    else if (currentIndex === -1 && checkedCards.length !== 0) { setPreviewCard(checkedCards[0])};
  }, [checkedCards, findCardIndex]);

  return (
    <>
      <div className="grid grid-cols-12 grid-rows-1">  
        <div className="col-start-3 col-span-8 row-start-1 row-span-1">
          <DrillNavi checkedCards={checkedCards} setCheckedCards={setCheckedCards} previewCard={previewCard} setPreviewCard={setPreviewCard} selectedDeck={selectedDrill} />
        </div>
          
          {/* 外側で col-start を書き、flex itmes-center をかき、そのなかに button タグを入れる。(ここにかく) */}
        <div className="col-start-1 col-span-2 row-start-1 row-span-1 flex items-center">
          <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2  font-semibold rounded-full rounded-r-lg flex items-center justify-center cursor-default border-r border-gray-700 h-[calc(9vh-2rem)] w-full"
          onClick={moveToPreviousCard}
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          </button>

        </div>

        <div className="col-start-11 col-span-2 row-start-1 row-span-1 flex items-center">
          <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 font-semibold rounded-full rounded-l-lg flex items-center justify-center cursor-default border-l border-gray-700 h-[calc(9vh-2rem)] w-full"
          onClick={moveToNextCard}
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          </button>
        </div>
        </div>
        <DrillContennt previewCardList={checkedCards} card={previewCard} setPreviewCard={setPreviewCard} />
      {/* moveToNextCard={moveToNextCard} moveToPreviousCard={moveToPreviousCard}/>  */}
    </>
  )
}

export const DrillShowing = ({selectedDrill}) => {

  const [previewCard, setPreviewCard] = useState(selectedDrill && selectedDrill.cards[1])
  const [checkedCards, setCheckedCards] = useState(selectedDrill?.cards)

  return (
    <>
    <DrillNavi checkedCards={checkedCards} setCheckedCards={setCheckedCards} previewCard={previewCard} setPreviewCard={setPreviewCard} selectedDeck={selectedDrill} />
    
    </>
  )
}

