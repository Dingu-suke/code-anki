import { useState, useCallback } from 'react';


export const useCardNavigation = () => {
  const initialCard = {
    id: 20, title: 'タイトル',
    body: '',
    answer: ``, 
    language: 'javascript', 
    remarks:'' 
  }
  const [checkedCards, setCheckedCards] = useState([]);
  const [previewCard, setPreviewCard] = useState(initialCard);

  const findCardIndex = useCallback(() => {
    return checkedCards.findIndex(card => card.id === previewCard.id);
  }, [checkedCards, previewCard]);

  const moveToNextCard = useCallback(() => {
    const currentIndex = findCardIndex();
    if (currentIndex < checkedCards.length - 1) {
      setPreviewCard(checkedCards[currentIndex + 1]);
    }
  }, [checkedCards, findCardIndex]);

  const moveToPreviousCard = useCallback(() => {
    const currentIndex = findCardIndex();
    if (currentIndex > 0) {
      setPreviewCard(checkedCards[currentIndex - 1]);
    }
  }, [checkedCards, findCardIndex]);

  return {
    checkedCards,
    setCheckedCards,
    previewCard,
    setPreviewCard,
    moveToNextCard,
    moveToPreviousCard
  };
};