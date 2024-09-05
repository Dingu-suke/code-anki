import React, { useEffect, useState } from 'react';
import { IoWarning } from "react-icons/io5";
import { useCardNavigation } from '../../hooks/useCardNavigation';
import { useCards } from '../../hooks/useCards';
import { PreviewCard } from '../Drill/PreviewCard';
import { CheckCard } from '../card/CheckCard';
import { PreviewCardList } from './PreviewCardList';
import { SelectCardIndex } from './SelectCardIndex';
import { YourDecksIndex } from './YourDecksIndex';
import { useYourDeckList } from '../../hooks/useYourDeckList';


export const DeckInfo = () => {
  const { cards, setCards, isLoading, setIsLoading } = useCards();
  const [filteredCards, setFilteredCards] = useState([]);  
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const { checkedCards, setCheckedCards, previewCard, setPreviewCard, moveToNextCard, moveToPreviousCard /*, scrollContainerRef*/ } = useCardNavigation();
  
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
    setSearchTermAndFilter
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

  const handleCheckboxClick = (card) => {
    setCheckedCards((prevCheckedCards) => {
      if (prevCheckedCards.some((c) => c.id === card.id)) {
        return prevCheckedCards.filter((c) => c.id !== card.id)
      } else {
        return [...prevCheckedCards, card]
      }
    })
  };
  
  const selectDeckState = (deck) => {
    selectedDeck === deck ? setSelectedDeck(null) : setSelectedDeck(deck)
  }

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

  const BackGroundColor = selectedDeck ? 'bg-slate-950 border-orange-400' : 'bg-slate-950 border-pink-400' 
  const hoverBorderColor = selectedDeck &&  'bg-indigo-950';

  return (
    <div>
      <div className="grid grid-cols-6">
      <div className="tooltip tooltip-right" data-tip="デッキ選択後、カードを選択し編成しましょう">
        <div>
        </div>
        <div className="col-start-1 col-span-1 py-4 pl-4 pr-2">
        <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded-t overflow-hidden border-b-transparent">
          {selectedDeck
          ? <div className="bg-slate-800 py-1 text-xs flex justify-center items-center font-semibold">選択中デッキ</div>
          :<div className="bg-slate-800 py-1 text-xs flex justify-center items-center font-semibold">デッキ未選択</div>}
        </div>
          <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded-b overflow-hidden border-t-transparent">
            <div className="h-[calc(15.2vh-2rem)]">
              <div className="text-cyan-400 p-2">
                <div
                  className="relative w-full h-full cursor-pointer group"
                  onClick={() => onClick(selectedDeck)}
                >
                  <div className={`border ${selectedDeck ? "border-blue-500 hover:border-blue-600" : "border-slate-700 hover:border-slate-500" }  bg-stone-950 text-cyan-50 rounded h-[calc(13.7vh-2rem)]`}>
                    <div className="h-full flex items-center justify-center">
                      {selectedDeck
                        ? (
                          <div className="grid grid-rows-3 w-full h-full">
                            <h2 className="row-start-1 row-span-1 text-xl font-semibold text-cyan-300 truncate px-2">
                              {selectedDeck.name}
                            </h2>
                            <div className="row-start-2 row-span-1 px-3">{selectedDeck ? selectedDeck.length : ""}</div>
                            <div className="row-start-3 row-span-1 px-3">ダグ名</div>
                          </div>
                        )
                        : (
                            <div className="!text-[3rem] font-semibold text-slate-600">
                              <IoWarning className="" />
                            </div>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          </div>
        <div className="col-start-2 col-span-4">
          <PreviewCardList checkedCards={checkedCards} setCheckedCards={setCheckedCards} previewCard={previewCard} setPreviewCard={setPreviewCard} />
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
          <YourDecksIndex  
            selectedDeck={selectedDeck} setSelectedDeck={setSelectedDeck}
            filteredDecks={filteredDecks}
            isDeckLoading={isDeckLoading}
            searchTerm={searchTerm}
            error={error}
      
            addDeck={addDeck}
            setSearchTermAndFilter={setSearchTermAndFilter}
          />
          </div>
          <div
            role="tabpanel"
            id="cardIndex-panel"
            className={`p-6 ${activeTab === 'cardIndex' ? '' : 'hidden'} text-white`}
          >
            <SelectCardIndex
              selectedCard={selectedCard}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filteredCards={filteredCards}
              isWindowOpen={isWindowOpen}
              closeWindow={closeWindow}
              handleCardClick={handleCardClick}
              CheckCard={CheckCard}
              handleCheckboxClick={handleCheckboxClick}/>
          </div>
          <div
            role="tabpanel"
            id="preview-panel"
            className={`px-6 pt-6 ${activeTab === 'preview' ? '' : 'hidden'} text-white`}
          >
            {/* <Drill  previewCard={previewCard}/> */}
            <PreviewCard previewCardList={checkedCards} card={previewCard} moveToNextCard={moveToNextCard} moveToPreviousCard={moveToPreviousCard} />
          </div>
        </div>
      </div>      
    <br /><br /><br /><br />
    <br /><br /><br /><br />
    <br /><br /><br /><br />
    </div>
  )
}