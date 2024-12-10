import React, { useEffect, useRef, useState } from 'react';
import { CheckCard } from '../card/CheckCard';
import ResponsiveWindow from '../window/ResponsiveWindow';
import { LanguageSelector } from '../runCodeEditorDaisyUI/LanguageController';
import { getLabelKey, LANGUAGE_LABELS, LanguageIcon } from '../runCodeEditorDaisyUI/constants';
import { useYourCard } from '../../hooks/useYourCard';
import { useCards } from '../../hooks/useCards';
import { NewResponsiveWindow } from '../window/NewResponsiveWindow';

const tableCellBorder = "border-r border-gray-700"
const tableIndexBorder = "border-r border-gray-600"

const checkCell = "py-3 px-3 w-16truncate text-center"
const titleCell = "py-3 pr-4 pl-8 w-96 truncate text-start"
const langCell = "py-3 px-2 w-28 truncate text-center"
const dateCell = "py-3 px-2 w-48 truncate text-center"

export const SelectCardIndex = (
  { 
    selectedCard, setSelectedCard,
    checkedCards, setCheckedCards,
    isWindowOpen,
    handleCardClick,
    closeWindow,
    handleCardUpdate,
    editDeck,
    selectedDeck,
    selCheckedCards
  }) => {

  const prevCheckedCardsRef = useRef([])
  const [language, setLanguage] = useState('')

  const { cards, setCards,
    isLoading, setIsLoading, 
    searchCard, setSearchCard, 
    filteredCards } = useCards(language);

  const handleCheckboxClick = (card) => {
    if (selectedDeck) {
      setCheckedCards(prevCheckedCards => {
        if (prevCheckedCards?.some(c => c.id === card.id)) {
          return prevCheckedCards.filter(c => c.id !== card.id);
        } else {
          return [...prevCheckedCards, card];
        }
      });
    } else {
    }
  };

  const onSelect = (newLanguage) => {
    setLanguage(LANGUAGE_LABELS[newLanguage]);
  };

  useEffect(() => {
    console.log(language)
  }, [language])

  // カード更新時にカード一覧を再レンダリングさせる
  useEffect(() => {
    if (selectedDeck && selectedDeck.cards) {
      
      // 更新前のカード群をRefに保存
      prevCheckedCardsRef.current = checkedCards;
      const updatedCheckedCards = selectedDeck.cards.map(newCard => {
        const prevCard = prevCheckedCardsRef.current.find(card => card.id === newCard.id);
        return prevCard ? { ...newCard, isChecked: prevCard.isChecked } : newCard;
      })
      setCheckedCards(updatedCheckedCards);
    }
  },[])

  const handleCardChecked = (cardId) => {
    selCheckedCards(prevCards => 
      {        
        prevCards.map(card =>
          card.id === cardId ? { ...card, isChecked: !card.isChecked} : card
        )
      }
    )
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
  <div className="">
    <div className="grid grid-cols-12 mb-4 gap-4">
        <input
          type="text"
          id="searchCards"
          name="searchCards"
          placeholder="カードを検索"
          value={searchCard}
          onChange={(e) => { setSearchCard(e.target.value)}}
          className="col-start-1 col-span-8 w-full p-2 pl-3  border rounded bg-gray-700 focus:outline-none focus:border-2 focus:border-blue-800 border-blue-900 text-cyan-100"
        />
      <div className="col-start-9">
        <LanguageSelector language={language} onSelect={onSelect} />
      </div>
    </div>
    <div className="ounded">
      <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded overflow-hidden max-w-xl">
        <div className="h-[calc(60vh-2rem)] overflow-auto">
          <div>
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-gray-700 text-gray-300 sticky top-0 z-10">
                <tr>
                  <th scope="col" className={`${checkCell} text-fuchsia-500 pl-4 text-center`} style={{ width: '5px' }}>✓</th>
                  <th scope="col" className={`${titleCell}`}>カード名</th>
                  <th scope="col" className={`${langCell}`}>言語</th>
                  <th scope="col" className={`${dateCell}`}>最終更新日</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {filteredCards.map((card) => (
                    <tr
                    key={card.id}
                    className={`border-b bg-gray-800 border-gray-700 ${selectedCard && selectedCard.id === card.id ? 'bg-indigo-900 hover:bg-blue-900' : 'hover:bg-cyan-900'}`}
                    onClick={(event) => {
                        if (!event.target.closest('td:first-child')) {
                          handleCardClick(event, card);
                        }
                    }}
                  >
                    <td className={`font-medium whitespace-nowrap text-cyan-400 ${checkCell}`}>
                      <input
                        className="checkbox checkbox-md checkbox-secondary hover:bg-pink-900"
                        type="checkbox"
                        checked={checkedCards?.some((c) => c.id === card.id)}
                        onChange={(event) => {
                          // イベントの伝播を停止、カード全体の onClick の阻止
                          event.stopPropagation();
                          handleCheckboxClick(card);
                        }}
                      />                  
                    </td>

                      <td className={`${titleCell} font-medium text-cyan-400`}>
                        <div>
                          {card.title}
                        </div>
                      </td>
                      <td className={`${langCell}`}>
                        <div className="flex items-center justify-center">
                          {card.language ? <LanguageIcon language={card.language} /> : ""}
                        </div>
                      </td>
                      <td className={`${dateCell}`}>
                      <div>
                        {new Date(card.updated_at).toLocaleDateString()}
                      </div>

                      </td>
                    </tr>
                  ))}
                </>

                
              </tbody>
            </table>
            <br/><br/><br/><br/>
            <br/><br/>
            {filteredCards.length == 0 && (
              <div className="flex justify-center text-gray-400 text-lg">
                カード作成・編集ページは 
                <a href="/your_cards" className="border-b border-sky-500 text-sky-500 ml-1">
                  こちら
                </a>
              </div>
            )}
            <br/><br/>
            <br/><br/><br/><br/>
            <br/><br/><br/><br/>
            <br/><br/><br/><br/>
            
            </div>
            <NewResponsiveWindow
              isOpen={isWindowOpen}
              title={`${selectedCard?.title}`}
              initialPosition={{ x: 800, y: 300 }}
              initialSize={{ width: 600, height: 450 }}
              onClose={closeWindow}
            >
              <CheckCard useInWindow={true} selectedCard={selectedCard} />
            </NewResponsiveWindow>
          </div>
        </div>
      </div>
    </div>
  );
}