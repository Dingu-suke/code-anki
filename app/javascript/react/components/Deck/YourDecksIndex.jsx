import React, { useCallback, useEffect, useState } from 'react';
import { DeckNew } from '../Form/DeckFormTest';
import { DeckTable } from './DeckTable';
import { useYourDeckList } from '../../hooks/useYourDeckList';
import { GiConsoleController } from 'react-icons/gi';
import { NewResponsiveWindow } from '../Window/NewResponsiveWindow';
import ResponsiveWindow from '../Window/ResponsiveWindow';

export const YourDecksIndex = ({ 
                                  selectedDeck, setSelectedDeck,
                                  filteredDecks,
                                  isDeckLoading,
                                  searchTerm,
                                  error
                                  ,
                                  addDeck,
                                  setSearchTermAndFilter }) => {

  const [isDeckNewWindowOpen, setIsDeckNewWindowOpen] = useState(false);

  const handleSearch = (e) => {
    setSearchTermAndFilter(e.target.value);
  };

  const openNewDeckWindow = () => {
    setIsDeckNewWindowOpen(true);
  };

  const closeNewDeckWindow = () => {
    setIsDeckNewWindowOpen(false);
  };

  // const handleAddDeck = async (newDeck) => {
  //   const addedDeck = await addDeck(newDeck);
  //   if (addedDeck) {
  //     fetchDecks();
  //     // ウィンドウを閉じずに、フォームをリセットする処理をここに追加
  //     // ここでDeckNewコンポーネントの状態をリセットするための関数を呼び出す
  //   }
  // };

  const handleAddDeckSuccess = useCallback((newDeck) => {
    // 必要に応じて追加の処理を行う
    // 例: 新しいデッキを選択状態にする、など
    console.log('新しいデッキが追加されました:', newDeck);
  }, []);


  if (isDeckLoading) {
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
          className="col-span-5 p-2 rounded bg-gray-700 border focus:outline-none focus:border-2 focus:border-blue-800 border-blue-900 text-cyan-100"
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
              selectedDeck={selectedDeck}
              setSelectedDeck={setSelectedDeck}
            />
          ) : (
            <div className="text-center py-4">デッキがありません</div>
          )}
        </div>
      </div>

      {/* {isDeckNewWindowOpen && (
        <ResponsiveWindow
          title="空のデッキを作成"
          initialPosition={{ x: 900, y: 500 }}
          initialSize={{ width: 700, height: 400 }}
          onClose={closeNewDeckWindow}
        >
          <DeckNew onSubmit={handleAddDeck} filteredDecks={filteredDecks} addDeck={addDeck}/>
        </ResponsiveWindow>
      )} */}
      <NewResponsiveWindow
        isOpen={isDeckNewWindowOpen}
        title="空のデッキを作成"
        initialPosition={{ x: 900, y: 500 }}
        initialSize={{ width: 700, height: 400 }}
        onClose={closeNewDeckWindow}
      >
        <DeckNew addDeck={addDeck} onSuccess={handleAddDeckSuccess}/>
      </NewResponsiveWindow>
    </div>
  );
};