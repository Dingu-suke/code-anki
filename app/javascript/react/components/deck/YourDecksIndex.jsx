import React, { useCallback, useEffect, useState } from 'react';
import { DeckNew } from '../form/DeckForm';
import { LanguageSelector } from '../runCodeEditorDaisyUI/LanguageController';
import { CATEGORY, LANGUAGE_LABELS, getLabelKey } from '../runCodeEditorDaisyUI/constants';
import { NewResponsiveWindow } from '../window/NewResponsiveWindow';
import { DeckTable } from './DeckTable';

export const YourDecksIndex = ({
                                  selectedDeck, setSelectedDeck,
                                  checkedCards, setCheckedCards,
                                  filteredDecks,
                                  isDeckLoading,
                                  searchTerm,
                                  error
                                  ,
                                  addDeck,
                                  deleteDeck,
                                  updateDeckInfo,
                                  setSearchTermAndFilter,
                                  setSelectedLanguage,
                                  setStatus,
                                  setSelectedCategory,
                                  reRenderDeckList,
                                  showToast
                                  // handleCheckCardsOfDeck
                                }) => {

  const [isDeckNewWindowOpen, setIsDeckNewWindowOpen] = useState(false);
  const [language, setLanguage] = useState("");

  const handleSearch = (e) => {
    setSearchTermAndFilter(e.target.value);
  };

  const openNewDeckWindow = () => {
    setIsDeckNewWindowOpen(true);
  };

  const closeNewDeckWindow = () => {
    setIsDeckNewWindowOpen(false);
  };

  const handleAddDeckSuccess = useCallback((newDeck) => {
    // 必要に応じて追加の処理を行う
    // 例: 新しいデッキを選択状態にする、など
    // トースト
    console.log('新しいデッキが追加されました:', newDeck);
  }, []);

  const onLanguageChange=(lang) => {
    // setValue('language', lang)
  }

  const onSelect = (newLanguage) => {
    // 🍉
    setLanguage(LANGUAGE_LABELS[newLanguage]);
  };
  
  useEffect(() => {
    // 🍉
    setSelectedLanguage(getLabelKey(language));
  }, [language])

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
      <div className="grid grid-cols-12 gap-4 mb-4">
        <input
          type="text"
          placeholder="デッキを検索"
          value={searchTerm}
          onChange={handleSearch}
          className="col-span-4 p-2 pl-3 rounded bg-gray-700 border focus:outline-none focus:border-2 focus:border-blue-800 border-blue-900 text-cyan-100"
        />
        <div className="z-40 flex items-center justify-center">
          <LanguageSelector language={language} onSelect={onSelect} />
        </div>
        <select
          id="category"
          name="category"
          className="col-span-3 px-3 py-2 rounded bg-gray-800 focus:outline-none focus:ring border-gray-700 border-2 text-cyan-100 truncate"
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          <option value="">すべて</option>
          {Object.entries(CATEGORY).map(([categoryKey, string]) => 
            (
              <option key={categoryKey} value={`${categoryKey}`}>
                {string}
              </option>              
            ))}
        </select>
        <select
          id="status"
          name="status"
          className="col-span-2 px-3 py-2 rounded bg-gray-800 focus:outline-none focus:ring border-gray-700 border-2 text-cyan-100 truncate"
          onChange={(event) => {setStatus(event.target.value)}}
        >
          <option value="">すべて</option>
          <option value="public">公開</option>
          <option value="private">非公開</option>
        </select>
        <button
          className="col-span-2 p-2 rounded-md bg-slate-900 border border-pink-500 text-pink-500 hover:bg-slate-800 truncate"
          onClick={openNewDeckWindow}
        >
          デッキ +作成
        </button>
      </div>
      
      <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded overflow-hidden">
        <DeckTable
          checkedCards={checkedCards} setCheckedCards={setCheckedCards}
          filteredDecks={filteredDecks}
          updateDeckInfo={updateDeckInfo}
          deleteDeck={deleteDeck}
          selectedDeck={selectedDeck}
          setSelectedDeck={setSelectedDeck}
          reRenderDeckList={reRenderDeckList}
          showToast={showToast}
          openNewDeckWindow={openNewDeckWindow}
          // handleCheckCardsOfDeck={handleCheckCardsOfDeck}
        />
      </div>
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