import React, { useEffect, useState } from 'react';
import { useYourDecks } from '../../hooks/useYourDecks';
import ResponsiveWindow from '../Window/ResponsiveWindow';

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
        <p className="text-cyan-100 mt-2">カード数: {cards.length || 0}</p>
      </div>
    </div>
  );
};

export const DeckList = ({ selectedCard }) => {
  const { decks, setDecks, isLoading, setIsLoading } = useYourDecks();
  const [filteredDecks, setFilteredDecks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState(null);

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
  
  const closeWindow = () => {  
    setIsWindowOpen(false);
    setSelectedDeck(null)
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-green-400 font-courier"></h1>
      <input
        type="text"
        placeholder="デッキを検索"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded bg-gray-700 focus:outline-none focus:border-2 focus:border-blue-800 border-blue-900 text-cyan-100"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredDecks?.length > 0 ? (
          filteredDecks.map((deck) => (
            <StackedDeckCard key={deck.id} deck={deck} cards={deck.cards} onClick={toggleDeckSelection} isSelected={selectedDeck && selectedDeck.id === deck.id} />
          ))
        ) : (
          <div className="text-lg text-center">デッキがありません</div>
        )}
      </div>
      {selectedDeck && (
        <div className="mt-8">
          <ul className="list-disc list-inside">
            {selectedDeck.cards.map(card => (
              <li key={card.id} className="text-cyan-100">{card.title}</li>
            ))}
          </ul>
        </div>
      )}
      {isWindowOpen && (
        <ResponsiveWindow
          title={`${selectedCard.title}`}
          initialPosition={{ x: 600, y: 90 }}
          initialSize={{ width: 700, height:  300 }}
          onClose={closeWindow}
        >
          <CardEditForm
            useInWindow={true}
            selectedCard={selectedCard}
            onUpdateSuccess={handleCardUpdate}
          />
        </ResponsiveWindow>
      )}
    </div>
  );
};
