import React, { useState } from 'react';
import { DrillNavi } from './DrillNavi';
import { CheckedCards } from '../deck/ChekedCards';

export const DrillShow = ({selectedDrill}) => {

  const [previewCard, setPreviewCard] = useState(selectedDrill && selectedDrill.cards[1])
  const [checkedCards, setCheckedCards] = useState(selectedDrill?.cards)


  return (
    <>
    <DrillNavi checkedCards={checkedCards} setCheckedCards={setCheckedCards} previewCard={previewCard} setPreviewCard={setPreviewCard} selectedDeck={selectedDrill} />
    
    </>
  )
}

