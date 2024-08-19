import React, { useEffect, useState } from 'react';
import { useYourDecks } from '../../hooks/useYourDeckCards';
import ResponsiveWindow from '../Window/ResponsiveWindow';
import { CheckCard } from '../card/CheckCard';

  const initialCard = 
    {
      id: 1, 
      title: '選択したカードのタイトル',
      body: '選択したカードの問題文',
      answer: `function greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Javascript");\n // 選択したカードのコード`, 
      language: 'javascript', 
      remarks:'選択したカードの備考'
    };

const StackedDeckCard = ({ deck, onClick, isSelected, cards }) => {
  const BackGroundColor = isSelected ? 'bg-slate-950 border-orange-400' : 'bg-slate-900 group-hover:bg-blue-950 group-hover:border-blue-500';
  const hoverBorderColor = isSelected ? '' : 'bg-indigo-950';
  return (
    <div 
      className="relative w-64 h-40 cursor-pointer group"
      onClick={() => onClick(deck)}
    >
    <div className={`m-4 absolute inset-0 border-2 border-blue-700  ${BackGroundColor} ${hoverBorderColor} rounded-lg shadow-md transform translate-x-2 translate-y-2`}></div>
      <div className={`m-4 absolute inset-0 border-2 border-blue-700 ${BackGroundColor} ${hoverBorderColor} rounded-lg shadow-md transform translate-x-1 translate-y-1`}></div>
      <div className={`m-4 relative border-2 border-blue-700 ${BackGroundColor} ${hoverBorderColor} rounded-lg shadow-md p-4 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1`}>
        <h2 className="m-5 text-xl font-semibold text-cyan-300 truncate">{deck.name}</h2>
        <p className="text-cyan-100 mt-2 kbd bg-slate-600 ">{cards.length || 0}</p>
      </div>
    </div>
  );
};

export const YourDeckList = () => {
  const { decks, setDecks, isLoading, setIsLoading } = useYourDecks();
  const [filteredDecks, setFilteredDecks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [isCardWindowOpen, setCardIsWindowOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(initialCard)
  const [selectedDeck, setSelectedDeck] = useState([]);

  useEffect(() => {
    if (decks) {
      const searchTerms = searchTerm.toLowerCase().split(' ');
      const filtered = decks
        .filter(deck =>
          searchTerms.every(term =>
            deck.name?.toLowerCase().includes(term)
          )
        )
      .sort((a, b) => a.name.localeCompare(b.name));
      setFilteredDecks(filtered);  
    }}, [decks, searchTerm]);

    useEffect(() => {
      setSelectedCard(initialCard)
    }, [selectedDeck])



    const toggleDeckSelection = (deck) => {
      if (selectedDeck && selectedDeck.id === deck.id) {
        setSelectedDeck(null);
        setIsWindowOpen(false);
      } else {
        setSelectedDeck(deck);
        setIsWindowOpen(true);
      }
    };

  const openWindow = (deck) => {
    setIsWindowOpen(true)
    setSelectedDeck(deck)
  };
  
  const opneCardwindow = (card) => {  
    setCardIsWindowOpen(true)
    setSelectedCard(card)  
  }

  const closeWindow = () => {
    setIsWindowOpen(false);
    setSelectedDeck(null)
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }
  if (isLoading) {
    return <div className="text-white loading loading-ring loading-lg">Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-green-400 font-courier">あなたのデッキ</h1>
      <input
        type="text"
        placeholder=" デッキを検索"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded bg-gray-700 focus:outline-none focus:border-2 focus:border-blue-800 border-blue-900 text-cyan-100"
      />
      <div className="grid grid-cols-2 gap-8 justify-start" style={{ gridTemplateColumns: 'repeat(2, 280px)' }}>
        {filteredDecks.length > 0 ? (
          filteredDecks.map((deck) => (
            <StackedDeckCard key={deck.id} deck={deck} cards={deck.cards} onClick={openWindow} isSelected={selectedDeck && selectedDeck.id === deck.id} />
          ))
        ) : (
          <div>デッキがありません</div>
        )}
      </div>
      {isWindowOpen && (
        <ResponsiveWindow
          title={`${selectedDeck.name}`}
          initialPosition={{ x: 600, y: 90 }}
          initialSize={{ width: 700, height: 800 }}
          onClose={closeWindow}
        >
        <div className="col-span-4">
            <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded overflow-hidden">
              <div className="p-4 h-[calc(35vh-2rem)] overflow-auto">
                {selectedDeck && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {selectedDeck.cards.map(card => (
                      <div
                      key={card.id}
                      className={`border hover:border-cyan-300 p-4 rounded shadow hover:bg-indigo-900
                        ${card === selectedCard ? 'bg-indigo-900 border-green-500' : 'bg-indigo-950 border-cyan-600' }`}
                        onClick={() => opneCardwindow(card)}
                        >
                        <h2 className={`text-xl font-semibold text-cyan-300`}>{card.title}</h2>
                      </div>
                    ))}
                </div>
              )}                
              </div>
            </div>
          </div>
          <CheckCard selectedCard={selectedCard}/>
        </ResponsiveWindow>
      )}
    </div>
  );
};