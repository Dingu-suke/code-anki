import React, { useEffect, useState } from 'react';
import { DeckNew } from '../Form/DeckFormTest';
import ResponsiveWindow from '../Window/ResponsiveWindow';
import { DeckTable } from './DeckTable';
import { useYourDeckList } from '../../hooks/useYourDeckList';
import { GiConsoleController } from 'react-icons/gi';

export const YourDecksIndex = () => {
  const {
    filteredDecks,
    selectedDeck,
    isLoading,
    error,
    searchTerm,
    fetchDecks,
    addDeck,
    selectDeck,
    setSearchTermAndFilter,
  } = useYourDeckList();



  console.log("YourDeckList, filteredDecks", filteredDecks.length)

  const [isDeckNewWindowOpen, setDeckNewIsWindowOpen] = useState(false);

  const handleSearch = (e) => {
    setSearchTermAndFilter(e.target.value);
  };

  const openNewDeckWindow = () => {
    setDeckNewIsWindowOpen(true);
  };

  const closeNewDeckWindow = () => {
    setDeckNewIsWindowOpen(false);
  };

  const handleAddDeck = async (newDeck) => {
    const addedDeck = await addDeck(newDeck);
    if (addedDeck) {
      fetchDecks();
      closeNewDeckWindow();
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="text-white loading loading-ring loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="grid grid-cols-7 gap-4 mb-4">
        <input
          type="text"
          placeholder="デッキを検索"
          value={searchTerm}
          onChange={handleSearch}
          className="col-span-5 p-2 rounded bg-gray-700 border border-blue-900 focus:border-blue-500 text-cyan-100"
        />
        <button 
          className="col-span-2 p-2 rounded-md bg-slate-900 border border-pink-500 text-pink-500 hover:bg-slate-800"
          onClick={openNewDeckWindow}
        >
          + New Deck
        </button>
      </div>
      
      <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded overflow-hidden">
        <div className="p-6 h-[calc(60vh-2rem)] overflow-auto">
          {filteredDecks.length > 0 ? (
            <DeckTable
              filteredDecks={filteredDecks}
              onClick={selectDeck}
              selectedDeck={selectedDeck}
              fetchDecks={fetchDecks}
            />
          ) : (
            <div className="text-center py-4">デッキがありません</div>
          )}
        </div>
      </div>

      {isDeckNewWindowOpen && (
        <ResponsiveWindow
          title="空のデッキを作成"
          initialPosition={{ x: 900, y: 500 }}
          initialSize={{ width: 700, height: 400 }}
          onClose={closeNewDeckWindow}
        >
          <DeckNew onSubmit={handleAddDeck} filteredDecks={filteredDecks} addDeck={addDeck}/>
        </ResponsiveWindow>
      )}
    </div>
  );
};