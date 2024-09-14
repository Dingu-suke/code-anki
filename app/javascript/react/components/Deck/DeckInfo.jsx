import React, { useEffect, useState } from 'react';
import { IoWarning } from "react-icons/io5";
import { useCardNavigation } from '../../hooks/useCardNavigation';
import { useCards } from '../../hooks/useCards';
import { PreviewCard } from '../Drill/PreviewCard';
// import { CheckCard } from '../card/CheckCard';
import { PreviewCardList } from './PreviewCardList';
import { SelectCardIndex } from './SelectCardIndex';
import { YourDecksIndex } from './YourDecksIndex';
import { useYourDeckList } from '../../hooks/useYourDeckList';
import { CATEGORY } from '../RunCodeEditorDaisyUI/constants';
import { AiTwotoneTags } from "react-icons/ai";
import { SaveButton } from './SaveButton';
import { SelectedDeckDisplay } from './SelectedDeckDisplay';

export const DeckInfo = () => {
  const { cards, setCards, isLoading, setIsLoading } = useCards();
  const [filteredCards, setFilteredCards] = useState([]);
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const { checkedCards, setCheckedCards,
          previewCard, setPreviewCard
          ,
          moveToNextCard,
          moveToPreviousCard /*, 
          scrollContainerRef*/ } = useCardNavigation();
  
  const {
    decks, setDecks,
    filteredDecks, setFilteredDecks,
    selectedDeck, setSelectedDeck,
    isDeckLoading, setIsDeckLoading,
    searchTerm, setSearchTerm,
    error, setError
    ,
    addDeck,
    fetchDecks,
    updateDeck,
    setSearchTermAndFilter,
    reRenderDeckList
  } = useYourDeckList()
  
  const closeWindow = () => {  
    setIsWindowOpen(false);
    setSelectedCard(null);
  }

  const handleCardClick = (event, card) => {
    // チェックボックス以外の領域がクリックされた場合のみウィンドウを開く
    if (!event.target.closest('.checkbox-container')) {
      setIsWindowOpen(true);
      setSelectedCard(card);
    }
  };

  useEffect(() => {
    if (cards) {
      const searchTerms = searchTerm.toLowerCase().split(' ');
      const filtered = cards
        .filter(card =>
          searchTerms.every(term => 
            card.title .toLowerCase().includes(term) || 
            card.body  .toLowerCase().includes(term) ||
            card.answer.toLowerCase().includes(term) 
          )
        )
      .sort((a, b) => a.title.localeCompare(b.title));
      setFilteredCards(filtered);
    }}, [cards, searchTerm]);

  const borderCalss = "border-teal-700 text-emerald-400 text-bold"
  const tabClass = "px-4 border-t border-x rounded-t-sm font-bold focus:outline-none relative";
  const activeTabClass = `bg-slate-950 ${borderCalss} border-b-0 after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[1px] after:bg-slate-950`;
  const inactiveTabClass = "bg-slate-900 text-emerald-700 border-transparent hover:text-green-600";

  const [activeTab, setActiveTab] = useState('deckIndex')

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  // const [activeTab, setActiveTab] = useState('cardIndex')
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="grid grid-cols-6">
        <div className="tooltip tooltip-right" data-tip="デッキ選択後、カードを選択し編成しましょう">
          <div className="col-start-1 col-span-1 py-4 pl-4 pr-2">
            <SelectedDeckDisplay selectedDeck={selectedDeck}/>
          </div>
        </div>
        <div className="col-start-2 col-span-4">
          <PreviewCardList checkedCards={checkedCards} setCheckedCards={setCheckedCards} previewCard={previewCard} setPreviewCard={setPreviewCard} selectedDeck={selectedDeck} />
        </div>
        <div className="col-start-6 col-span-1 py-4">
          <SaveButton selectedDeck={selectedDeck} checkedCards={checkedCards} updateDeck={updateDeck} fetchDecks={fetchDecks}/>
        </div>
      </div>
      <div className="px-4 w-full">
        <div role="tablist" className={`flex border-b ${borderCalss}`}>
          <button
            role="tab"
            className={`${tabClass} ${activeTab === 'deckIndex' ? activeTabClass : inactiveTabClass} cursor-auto h-7 text-sm`}
            onClick={() => handleTabChange('deckIndex')}
            aria-selected={activeTab === 'deckIndex'}
            aria-controls="deckIndex-panel"
            >
            デッキ選択
          </button>
          <button
            role="tab"
            className={`${tabClass} ${activeTab === 'cardIndex' ? activeTabClass : inactiveTabClass} cursor-auto h-7 text-sm`}
            onClick={() => handleTabChange('cardIndex')}
            aria-selected={activeTab === 'cardIndex'}
            aria-controls="cardIndex-panel"
            >
            カード選択
          </button>
          <button
            role="tab"
            className={`${tabClass} ${activeTab === 'preview' ? activeTabClass : inactiveTabClass} cursor-auto h-7 text-sm`}
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
            isDeckLoading={isDeckLoading}
            searchTerm={searchTerm}
            error={error}
            addDeck={addDeck}
            setSearchTermAndFilter={setSearchTermAndFilter}
            reRenderDeckList={reRenderDeckList}
            // handleCheckCardsOfDeck={handleCheckCardsOfDeck}
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
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredCards={filteredCards}
            isWindowOpen={isWindowOpen}
            closeWindow={closeWindow}
            handleCardClick={handleCardClick}
            // CheckCard={CheckCard}
            checkedCards={checkedCards}
            setCheckedCards={setCheckedCards}
            // selectedDeck={selectedDeck}
          />
          </div>
          <div
            role="tabpanel"
            id="preview-panel"
            className={`px-6 pt-6 ${activeTab === 'preview' ? '' : 'hidden'} text-white`}
          >
            {/* プレビュー */}
            <PreviewCard previewCardList={checkedCards} card={previewCard} moveToNextCard={moveToNextCard} moveToPreviousCard={moveToPreviousCard} />
          </div>
        </div>
      </div>      
    {/* <br /><br /><br /><br />
    <br /><br /><br /><br />
    <br /><br /><br /><br /> */}
    </div>
  )
}