import React, { useState, useEffect } from 'react';
import { useCards } from '../../hooks/useCards';

const DeckForm = ({ currentUser, onSubmit }) => {
  const [name, setName] = useState('');
  const [selectedCardIds, setSelectedCardIds] = useState([]);
  const [tagNames, setTagNames] = useState('');
  const { cards } = useCards();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      card_ids: selectedCardIds,
      tag_names: tagNames,
    });
  };

  const handleCardSelection = (cardId) => {
    setSelectedCardIds(prev =>
      prev.includes(cardId)
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-4">New deck</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2">タイトル</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 text-cyan-800 rounded"
          />
        </div>

        <div>
          <p className="mb-2">[既存のカードを選択]</p>
          {cards && cards.length > 0 ? (
            cards.map(card => (
              <label key={card.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="toggle bg-cyan-50 hover:bg-cyan-50 border border-cyan-600"
                  style={{ "--tglbg": selectedCardIds.includes(card.id) ? "#85de59" : "#698182" }}
                  checked={selectedCardIds.includes(card.id)}
                  onChange={() => handleCardSelection(card.id)}
                />
                <div className="border border-cyan-600 hover:border-cyan-300 bg-indigo-950 hover:bg-indigo-900 p-2 rounded shadow">
                  <span className="text-xl font-semibold text-cyan-400">
                    {card.title}
                  </span>
                </div >
              </label>
            ))
          ) : (
            <p>まだカードがありません。カードを作成してください。</p>
          )}
        </div>

        <div>
          <label htmlFor="tagNames" className="block mb-2">タグ (コンマで区切る)</label>
          <input
            type="text"
            id="tagNames"
            value={tagNames}
            onChange={(e) => setTagNames(e.target.value)}
            className="w-full p-2 text-cyan-800 rounded"
          />
        </div>

        <button type="submit" className="btn btn-outline btn-info">
          デッキを作成する
        </button>
      </form>
    </div>
  );
};

export default DeckForm;