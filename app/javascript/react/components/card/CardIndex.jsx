import React, { useEffect, useState } from 'react';
import { useCards } from '../../hooks/useCards';
import useModal from '../../hooks/useModal';
import Modal from '../Modal';
import Window from '../Window/Window';

export const CardList = () => {
  const { cards, setCards, isLoading, setIsLoading } = useCards();
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { modalRef, openModal, closeModal } = useModal()

  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const openWindow = () => setIsWindowOpen(true);
  const closeWindow = () => setIsWindowOpen(false);
  
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Modal modalRef={modalRef}>

      </Modal>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-orange-400 font-courier">あなたのカード</h1>
      <input
        type="text"
        placeholder="Search cards..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border rounded bg-gray-700 focus:outline-none focus:border-2 focus:border-blue-800 border-blue-900 text-cyan-300"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" /*onClick={openModal}*/ onClick={openWindow}>

        {filteredCards.map((card) => (
          <div key={card.id} className="border border-cyan-600 hover:border-cyan-300 p-4 rounded shadow bg-indigo-950 hover:bg-indigo-900">
            <h2 className="text-xl font-semibold text-cyan-400 ">{card.title}</h2>
            {/* <h2 className="text-xl font-semibold text-cyan-400 ">{card.title}</h2> */}
          </div>
        ))}
      </div>
      {isWindowOpen && (
        <Window
          title="Example Window"
          initialPosition={{ x: 300, y: 60 }}
          initialSize={{ width: 500, height: 800 }}
          onClose={closeWindow}
        >
          <h2 className="text-xl font-bold mb-2">ウィンドウの内容</h2>
          <p>これはドラッグ可能でサイズ変更可能なウィンドウコンポーネントです。</p>
          <p className="mt-2">×ボタンをクリックして閉じることができます。</p>
        </Window>
      )}
    </div>

    </div>
  )
}