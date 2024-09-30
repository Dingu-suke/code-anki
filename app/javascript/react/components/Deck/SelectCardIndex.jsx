import React, { useEffect, useRef } from 'react';
import ResponsiveWindow from '../Window/ResponsiveWindow';
import { CheckCard } from '../card/CheckCard';
import CardForm from '../Form/CardEditForm';

export const SelectCardIndex = (
  { 
    selectedCard, setSelectedCard,
    checkedCards, setCheckedCards,
    searchTerm, setSearchTerm,
    filteredCards,
    isWindowOpen,
    handleCardClick,
    closeWindow,
    handleCardUpdate,
    editDeck,
    selectedDeck,
    selCheckedCards
  }) => {

  const prevCheckedCardsRef = useRef([])

  const handleCheckboxClick = (card) => {
    setCheckedCards(prevCheckedCards => {
      if (prevCheckedCards.some(c => c.id === card.id)) {
        return prevCheckedCards.filter(c => c.id !== card.id);
      } else {
        return [...prevCheckedCards, card];
      }
    });
  };

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

  return (
  <div className="">
    <div className="grid grid-cols-6">
      <input
        type="text"
        id="searchCards"
        name="searchCards"
        placeholder="カードを検索"
        value={searchTerm}
        onChange={(e) => { setSearchTerm(e.target.value)}}
        className="col-start-1 col-span-4 w-full p-2 pl-3 mb-4 border rounded bg-gray-700 focus:outline-none focus:border-2 focus:border-blue-800 border-blue-900 text-cyan-100"
      />
    </div>
    
    <div className="col-span-4 ounded">
      <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded overflow-hidden">
        <div className="h-[calc(60vh-2rem)] overflow-auto">
          <div>
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-gray-700 text-gray-300 top-0 z-10 relative">
                <tr>
                  <th scope="col" className="py-3 text-fuchsia-500 text-center px-3" style={{ width: '5px' }}>✓</th>
                  <th scope="col" className="px-6 py-3 justify-center border-r border-slate-600">カード名</th>
                  <th scope="col" className="px-6 py-3">言語</th>
                </tr>
              </thead>
              <tbody>
              {filteredCards.map((card) => (
                <tr
                key={card.id}
                className={`border-b bg-gray-800 border-gray-700 ${selectedCard && selectedCard.id === card.id ? 'bg-indigo-900 hover:bg-blue-900' : 'hover:bg-cyan-900'}`}
                onClick={(event) => {
                    if (!event.target.closest('td:first-child')) {
                    handleCardClick(event, card);
                  }
                }}
                // onChange={() => handleCardChecked(card.id)}
              >
                <td className={`font-medium whitespace-nowrap text-cyan-400 px-3`}>
                  <div className="flex items-center justify-center w-full h-full">
                    <input
                      className="checkbox checkbox-md checkbox-secondary hover:bg-pink-900"
                      type="checkbox"
                      checked={checkedCards.some((c) => c.id === card.id)}
                      onChange={(event) => {
                        // イベントの伝播を停止、カード全体の onClick の阻止
                        event.stopPropagation();
                        handleCheckboxClick(card);
                      }}
                    />
                  </div>
                </td>
              
                  <td className="px-6 py-4 font-medium whitespace-nowrap text-cyan-400 border-r border-gray-700">
                    <div className="flex items-center justify-start w-64 h-full truncate">
                      <div
                        
                      >
                        {card.title}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center justify-start w-48 h-full px-6 py-4">
                      {card.language}
                    </div>
                  </td>
                </tr>
              ))}
                
              </tbody>
            </table>
            <br/><br/><br/><br/>
            <br/><br/><br/><br/>
            <br/><br/><br/><br/>
            <br/><br/><br/><br/>
            <br/><br/><br/><br/>
            
            </div>
            {isWindowOpen && (
              <ResponsiveWindow
                title={`${selectedCard.title}`}
                initialPosition={{ x: 100, y: 500 }}
                initialSize={{ width: 600, height: 450 }}
                onClose={closeWindow}
              >
                <CheckCard selectedCard={selectedCard} />
              </ResponsiveWindow>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}