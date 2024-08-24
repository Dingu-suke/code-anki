import React, { useEffect, useRef, useState } from 'react';
import { useCards } from '../../hooks/useCards';
import ResponsiveWindow from '../Window/ResponsiveWindow';
import { CheckCard } from '../card/CheckCard';
import { CheckedCards } from './ChekedCards';
import { Drill } from '../Drill/Drill';
// import { useCards } from '../../hooks/useCards';
// import ResponsiveWindow from '../Window/ResponsiveWindow';
// import CardEditForm from '../Form/CardEditForm';

export const DeckForm = () => {
  const { cards, setCards, isLoading, setIsLoading } = useCards();
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // const { modalRef, openModal, closeModal } = useModal()

  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [checkedCards, setCheckedCards] = useState([]);
  // const [eachCardValue, setEachCardValue] = useState('')

  const openWindow = (card) => {
    setIsWindowOpen(true)
    setSelectedCard(card)
  };
  
  const closeWindow = () => {  
    setIsWindowOpen(false);
    setSelectedCard(null);
  }

  const opneCardindow = () => {
    console.log("undefined");
  };

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
  useEffect(() => {
    console.log(checkedCards)
  }, [checkedCards])
  
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

  // カード更新時にカード一覧を再レンダリングさせる
  
  // const handleCardUpdate = (updatedCard) => {
  //   setSelectedCard(updatedCard);
  //   setCards(prevCards => 
  //     prevCards.map(card => card.id === updatedCard.id ? updatedCard : card)
  //   );
  // };

  const appnedChecedCards = (card) => {
    
  }
  
  const handleSearch = (e) => {
  
    setSearchTerm(e.target.value);
  }
  
  const borderCalss = "border-teal-700 text-emerald-400 text-bold"
  const tabClass = "px-4 border-t border-x rounded-t-sm font-bold focus:outline-none relative";
  const activeTabClass = `bg-slate-950 ${borderCalss} border-b-0 after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[1px] after:bg-slate-950`;
  const inactiveTabClass = "bg-slate-900 text-emerald-700 border-transparent hover:text-green-600";

  const [activeTab, setActiveTab] = useState('cardIndex')

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  // const [activeTab, setActiveTab] = useState('cardIndex')
  if (isLoading) {
    return <div>Loading...</div>
  }

  const  CardIndex = (
    <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-2 text-orange-400 font-courier">{/* あなたのカード */}</h1>
        <input
          type="text"
          placeholder="カードを検索"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 mb-4 border rounded bg-gray-700 focus:outline-none focus:border-2 focus:border-blue-800 border-blue-900 text-cyan-100"
        />
        <div className="col-span-4">
          <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded overflow-hidden">
            <div className="p-4 h-[calc(60vh-2rem)] overflow-auto">

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4" >
                <div className={`border border-dashed hover:border-solid border-pink-400 hover:border-pink-400 text-pink-400 p-4 rounded shadow bg-slate-950`}>
                  <h2 className='text-xl font-semibold'>+ new card</h2>
                </div>
                {filteredCards.map((card) => (
                  <div
                  key={card.id}
                  className={`border hover:border-cyan-300 p-4 rounded shadow hover:bg-indigo-900
                  ${card === selectedCard ? 'bg-indigo-900 border-green-500' : 'bg-indigo-950 border-cyan-600' }`}
                  onClick={(event) => handleCardClick(event, card)}
                  >
                    <h2 className='text-xl font-semibold text-cyan-300'>
                      <div className="grid grid-cols-2">
                        <div className="text-cyan-50">
                          {card.title}
                        <div>
                      </div>
                      </div>
                      <div className="justify-self-end checkbox-container" onClick={appnedChecedCards(card)}>
                      <input 
                        type="checkbox"
                        className="checkbox checkbox-lg checkbox-secondary hover:bg-pink-900 m-1"
                        // checked={sedCards.some((c) => c.id === card.id)}
                        onClick={() => handleCheckboxClick(card)}
                        checked={card.isSelected} // カードの選択状態を反映
                        />
                      </div>
                    </div>
                    </h2>
                  </div>
                ))}
              </div>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
              {isWindowOpen && (
                <ResponsiveWindow
                  title={`${selectedCard.title}`}
                  initialPosition={{ x: 100, y: 500 }}
                  initialSize={{ width: 600, height: 450 }}
                  onClose={closeWindow}
                >
                  <CheckCard selectedCard={selectedCard}/>
                </ResponsiveWindow>
              )}
            </div>
          </div>
        </div>
      </div>    
  );

  return (
    <div>
      <CheckedCards checkedCards={checkedCards} selectedCard={selectedCard } />
      <div className="w-full px-4 pb-4">
        <div role="tablist" className={`flex border-b ${borderCalss}`}>
          <button
            role="tab"
            className={`${tabClass} ${activeTab === 'cardIndex' ? activeTabClass : inactiveTabClass} cursor-auto h-7 text-sm`}
            onClick={() => handleTabChange('cardIndex')}
            aria-selected={activeTab === 'cardIndex'}
            aria-controls="cardIndex-panel"
            >
            カード一覧
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
            id="cardIndex-panel"
            className={`p-6 ${activeTab === 'cardIndex' ? '' : 'hidden'} text-white`}
          >
            {CardIndex}
          </div>
          <div
            role="tabpanel"
            id="preview-panel"
            className={`p-6 ${activeTab === 'preview' ? '' : 'hidden'} text-white`}
          >
            <Drill />
          </div>
        </div>
      </div>
    </div>
  )
}