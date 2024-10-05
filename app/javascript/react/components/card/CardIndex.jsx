import React, { useEffect, useState } from 'react';
import { useCards } from '../../hooks/useCards';
import ResponsiveWindow from '../Window/ResponsiveWindow';
import CardForm from '../Form/CardEditForm';

export const CardList = () => {
  const { cards, setCards, isLoading, setIsLoading } = useCards();
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // const { modalRef, openModal, closeModal } = useModal()

  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  // const [eachCardValue, setEachCardValue] = useState('')

  const openWindow = (card) => {
    setIsWindowOpen(true)
    setSelectedCard(card)
  };
  
  const closeWindow = () => {  
    setIsWindowOpen(false);
    setSelectedCard(null)
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

  // カード更新時にカード一覧を再レンダリングさせる
  const handleCardUpdate = (updatedCard) => {
    setSelectedCard(updatedCard);
    setCards(prevCards =>
      prevCards.map(card => card.id === updatedCard.id ? updatedCard : card)
    );
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-orange-400 font-courier">あなたのカード</h1>
        <input
          type="text"
          placeholder="カードを検索"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 mb-4 border rounded bg-gray-700 focus:outline-none focus:border-2 focus:border-blue-800 border-blue-900 text-cyan-100"
        />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">

        <div className={`border border-dashed hover:border-solid border-pink-400 hover:border-pink-400 text-pink-400 p-4 rounded shadow  bg-slate-950`}>
          <h2 className='text-xl font-semibold '>+ new card</h2>
        </div>
        
        {filteredCards.map((card) => (
          <div
          key={card.id}
          className={`border hover:border-cyan-300 p-4 rounded shadow hover:bg-indigo-900
          ${card === selectedCard ? 'bg-indigo-900 border-green-500' : 'bg-indigo-950 border-cyan-600' }`}
          onClick={() => openWindow(card)}
          >
            <h2 className='text-xl font-semibold text-cyan-300'>{card.title}</h2>
          </div>
        ))}
      </div>
      {isWindowOpen && (
        <ResponsiveWindow
          title={`${selectedCard.title}`}
          initialPosition={{ x: 600, y: 90 }}
          initialSize={{ width: 700, height: 800 }}
          onClose={closeWindow}
        >
          <CardForm
            useInWindow={true}
            selectedCard={selectedCard}
            onUpdateSuccess={handleCardUpdate}
          />
        </ResponsiveWindow>
      )}
    </div>
  </div>
  )
}