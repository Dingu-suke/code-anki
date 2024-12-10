import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useCardNavigation } from '../../hooks/useCardNavigation';
import { useCards } from '../../hooks/useCards';
import { PreviewCard } from './PreviewCard';
import { useYourDeckList } from '../../hooks/useYourDeckList';
import { PreviewCardList } from './PreviewCardList';
import { SaveButton } from './SaveButton';
import { SelectCardIndex } from './SelectCardIndex';
import { SelectedDeckDisplay } from './SelectedDeckDisplay';
import { YourDecksIndex } from './YourDecksIndex';
import { Toast } from '../toast/Toust';
import { activeTabClassGreen, borderCalss, inactiveTabClassGreen, tabClass } from '../../tabStylesAndFunc/styleClass';

export const DeckInfo = () => {
  
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const prevSelectedCardRef = useRef(null);
  const [activeTab, setActiveTab] = useState('deckIndex')
  
  //  ▼--- カスタムフックス ---▼
  
  const { cards, setCards,
          isLoading, setIsLoading, 
          searchCard, setSearchCard, 
          filteredCards } = useCards();
  
          const { checkedCards, setCheckedCards,
          previewCard, setPreviewCard
          ,
          moveToNextCard,
          moveToPreviousCard,
          initialCard
          /*, 
          scrollContainerRef*/ } = useCardNavigation();
  
  const {
    decks, setDecks,
    filteredDecks, setFilteredDecks,
    selectedDeck, setSelectedDeck,
    isDeckLoading, setIsDeckLoading,
    searchTerm, setSearchTerm,
    error, setError
    ,
    toast, showToast,
    addDeck,
    updateDeckInfo,
    fetchDecks,
    deleteDeck,
    editDeck,
    setSearchTermAndFilter,
    setSelectedLanguage,
    setSelectedCategory,
    setStatus,
    reRenderDeckList,    
    updateDeckAndCard
    
  } = useYourDeckList('/your_decks')

  //  ▲--- カスタムフックス ---▲
  
  const closeWindow = () => {  
    setIsWindowOpen(false);
    setSelectedCard(null);
  }

  useEffect(() => {
    // 🍉
    prevSelectedCardRef.current = selectedCard;
  }, [selectedCard])

  useEffect(() => {
    // checkedCardsが配列であることが前提
    const isPreviewCardChecked = checkedCards?.some(card => card.id === previewCard.id);
    
    if (!isPreviewCardChecked && previewCard?.id !== initialCard?.id) {
      setPreviewCard(initialCard);
    }
  }, [checkedCards, previewCard, initialCard, setPreviewCard]);

  const handleCardClick = (event, card) => {
      const isCurrentlySelected = selectedCard && selectedCard.id === card.id //boolean
      setSelectedCard(isCurrentlySelected ? null : card);
      setIsWindowOpen(!isCurrentlySelected);
    // 🍉 useEffect で更新
  };
  
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const updateCardInDecks = useCallback((updatedCard) => {
    // カードの状態を更新
    setCards(prevCards =>
      prevCards.map(card => card.id === updatedCard.id ? updatedCard : card)
    );

    // 選択されているカードを更新
    setSelectedCard(updatedCard);

    // すべてのデッキを更新
    setDecks(prevDecks =>
      prevDecks.map(deck => ({
        ...deck,
        cards: deck.cards.map(card => 
          card.id === updatedCard.id ? updatedCard : card
        )
      }))
    );

    // 選択されているデッキも更新
    setSelectedDeck(prevDeck => {
      if (!prevDeck) return prevDeck;
      return {
        ...prevDeck,
        cards: prevDeck.cards.map(card => 
          card.id === updatedCard.id ? updatedCard : card
        )
      };
    });
  }, []);

  // カード更新のハンドラー
  const handleCardUpdate = useCallback((updatedCard) => {
    updateCardInDecks(updatedCard);
  }, [updateCardInDecks]);
        

  return (
    <div>
        {toast.show && <Toast message={toast.message} type={toast.type} />}
      <div className="grid grid-cols-6">        
        <div className="col-start-1 col-span-1 p-4 pr-2">
          <SelectedDeckDisplay selectedDeck={selectedDeck}/>
        </div>        
        <div className="col-start-2 col-span-4">
          <PreviewCardList checkedCards={checkedCards} setCheckedCards={setCheckedCards} previewCard={previewCard} setPreviewCard={setPreviewCard} selectedDeck={selectedDeck} />
        </div>
        <div className="col-start-6 col-span-1 py-4">
          <SaveButton selectedDeck={selectedDeck} checkedCards={checkedCards} editDeck={editDeck} fetchDecks={fetchDecks}/>
        </div>
      </div>
      <div className="px-4 w-full">
        <div role="tablist" className={`flex border-b ${borderCalss}`}>
          <button
            role="tab"
            className={`${tabClass} ${activeTab === 'deckIndex' ? activeTabClassGreen : inactiveTabClassGreen} cursor-auto h-7 text-sm`}
            onClick={() => handleTabChange('deckIndex')}
            aria-selected={activeTab === 'deckIndex'}
            aria-controls="deckIndex-panel"
            >
            デッキ選択
          </button>
          <button
            role="tab"
            className={`${tabClass} ${activeTab === 'cardIndex' ? activeTabClassGreen : inactiveTabClassGreen} cursor-auto h-7 text-sm`}
            onClick={() => handleTabChange('cardIndex')}
            aria-selected={activeTab === 'cardIndex'}
            aria-controls="cardIndex-panel"
            >
            カード選択
          </button>
          <button
            role="tab"
            className={`${tabClass} ${activeTab === 'preview' ? activeTabClassGreen : inactiveTabClassGreen} cursor-auto h-7 text-sm`}
            onClick={() => handleTabChange('preview')}
            aria-selected={activeTab === 'preview'}
            aria-controls="preview-panel"
            >
            プレビュー
          </button>
        </div>
        <div className={`bg-slate-950 border-x border-b rounded-b-md ${borderCalss}`}>
          <div
            role="tabpanel"
            id="deckIndex-panel"
            className={`${activeTab === 'deckIndex' ? '' : 'hidden'} text-white`}
          >
            {/* デッキ選択 */}
          <YourDecksIndex
            selectedDeck={selectedDeck} setSelectedDeck={setSelectedDeck}
            checkedCards={checkedCards} setCheckedCards={setCheckedCards}
            filteredDecks={filteredDecks}
            updateDeckInfo={updateDeckInfo}
            isDeckLoading={isDeckLoading}
            searchTerm={searchTerm}
            error={error}
            addDeck={addDeck}
            deleteDeck={deleteDeck}
            setSelectedLanguage={setSelectedLanguage}
            setSelectedCategory={setSelectedCategory}
            setStatus={setStatus}
            setSearchTermAndFilter={setSearchTermAndFilter}
            reRenderDeckList={reRenderDeckList}
            showToast={showToast}
          />
          </div>
          <div
            role="tabpanel"
            id="cardIndex-panel"
            className={`p-6 ${activeTab === 'cardIndex' ? '' : 'hidden'} text-white`}
          >
            {/* カード選択 */}
          <SelectCardIndex
            selectedCard={selectedCard}
            searchCard={searchCard}
            setSearchCard={setSearchCard}
            filteredCards={filteredCards}
            isWindowOpen={isWindowOpen}
            closeWindow={closeWindow}
            handleCardClick={handleCardClick}
            // CheckCard={CheckCard}
            checkedCards={checkedCards}
            setCheckedCards={setCheckedCards}
            handleCardUpdate={handleCardUpdate}
            updateDeckAndCard={updateDeckAndCard}
            selectedDeck={selectedDeck}
          />
          </div>
          <div
            role="tabpanel"
            id="preview-panel"
            className={`px-6 pt-6 ${activeTab === 'preview' ? '' : 'hidden'} text-white`}
          >
            {/* プレビュー */}
            <PreviewCard
              previewCardList={checkedCards}
              card={previewCard}
              moveToNextCard={moveToNextCard}
              moveToPreviousCard={moveToPreviousCard}
              checkedCards={checkedCards}
            />
          </div>
        </div>
      </div>
    </div>
  )
}