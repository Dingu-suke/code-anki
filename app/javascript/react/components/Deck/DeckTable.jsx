import React, { useState } from 'react';
import { Toggle } from '../Toggle/Toggle';
import { LanguageIcon, CATEGORY } from '../RunCodeEditorDaisyUI/constants';
import { LuPencil } from "react-icons/lu";
import { NewResponsiveWindow } from '../Window/NewResponsiveWindow';
import { DeckEdit } from '../Form/DeckForm';

const methodLearningColor = "bg-yellow-950 text-amber-200 bg-opacity-55"
const algorithmColor = "bg-green-950 text-emerald-200"
const refactoringColor = "bg-blue-950 text-cyan-200"
const tradeOffColor = "bg-fuchsia-950 text-pink-200 bg-opacity-60"
export const DeckTable = (
    { 
      checkedCards,
      setCheckedCards,
      filteredDecks,
      updateDeckInfo,
      selectedDeck,
      setSelectedDeck,
      handleCheckCardsOfDeck,
      reRenderDeckList
    }) => {

  const [] = useState('')
  
  const setDeck = (deck) => {
    selectedDeck === deck 
      ? (() => {
          setSelectedDeck(null);
          setCheckedCards([]);
        })()
      : (() => {
          setSelectedDeck(deck);
          setCheckedCards(deck.cards);
        })()
  }
  const [isDeckEditWindowOpen, setIsDeckEditWindowOpen] = useState(false);
  const [editDeck, setEditDeck] = useState(null)

  const handleEditDeck = (deck) => {
    setIsDeckEditWindowOpen(true)
    setEditDeck(deck)
  }
  
  const closeNewDeckWindow = () => {
    setIsDeckEditWindowOpen(false);
  };

  const handleClickConditions = (event, deck) => {
    event.stopPropagation()
    if (!event.target.closest('.js-toggle-button')) {
      setDeck(deck)
    } 
    else if (!event.target.closest('.js-edit-icon')) {
      setDeck(deck)
    }
  }

  return (
    <div className="shadow-lg rounded-md">
      <div className="overflow-y-auto max-h-[500px] min-h-[500px]"> {/* スクロール可能な高さを設定 */}
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs uppercase bg-gray-700 text-gray-300 sticky top-0 z-10"> {/* stickyヘッダーの設定 */}
            <tr className=''>
              <th scope="col" className="px-2 py-2 min-w-4"></th>
              <th scope="col" className="px-4 py-3 min-w-20">デッキ名</th>
              <th scope="col" className="px-4 py-3 min-w-20">カード数</th>
              <th scope="col" className="px-8 py-3 min-w-20">言語</th>
              <th scope="col" className="px-4 py-3 min-w-20">カテゴリ</th>
              <th scope="col" className="px-4 py-3 min-w-20">作成日</th>
              <th scope="col" className="px-4 py-3 min-w-28 flex items-center justify-center">公開 / 非公開</th>
            </tr>
          </thead>
          <tbody>
              {/* <div className="text-center py-4">デッキがありません</div> */}
            {filteredDecks.length > 0 ? "" : ( <div className="text-center py-4">デッキがありません</div>) }
            {filteredDecks.map((deck) => (
              <tr
                key={deck.id}
                className={`border-b bg-gray-800 border-gray-700 ${
                  selectedDeck && selectedDeck.id === deck.id ? 'bg-indigo-900 hover:bg-blue-900' : 'hover:bg-cyan-900'
                }`}
                onClick={(event) => {handleClickConditions(event, deck)}} 
              >
                <td scope="row"
                    className="px-2 py-2 font-medium whitespace-nowrap text-gray-400 min-w-4 js-edit-icon hover:text-red-400"
                    onClick={(event) => {
                                      event.stopPropagation();
                                      handleEditDeck(deck)
                                    }}
                  >
                    <div>
                      <LuPencil />
                    </div>
                </td>
                <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-cyan-400 min-w-20">
                  {deck.name}
                </td>
                <td className="px-4 py-3 min-w-20">
                  <div className="flex justify-center items-center">
                    <div className={`
                      text-sm font-medium rounded min-w-8 text-center
                      ${deck.cards?.length > 4 ? "border border-lime-900 bg-sky-950 text-yellow-100" : "bg-red-950 text-pink-400" }`
                      }>
                      {deck.cards ? deck.cards.length : 0}
                    </div>
                  </div>
                </td>
                <td className="px-8 py-3 min-w-20">
                  {deck.language ? <LanguageIcon language={deck.language} /> : ""}
                </td>
                <td className="px-4 py-3 min-w-20">
                  {deck.category
                  ? 
                  <div className={`inline-block text-xs font-medium ml-1 px-2 rounded truncate
                      ${deck.category === "methodLearning" && methodLearningColor}
                      ${deck.category === "algorithm" && algorithmColor}
                      ${deck.category === "refactoring" && refactoringColor}
                      ${deck.category === "tradeOff" && tradeOffColor}
                      `
                      }>
                      <div className='py-1'>
                        {CATEGORY[`${deck.category}`]}
                      </div>
                    </div> 
                  :
                    <span className="text-blue-100 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"></span>
                  }
                </td>
                <td className="px-4 py-3 min-w-20">
                  {new Date(deck.updated_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 min-w-24 flex items-center justify-center">
                  <Toggle initialStatus={deck.status} deck={deck}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br/><br/><br/>
        <br/><br/><br/><br/>
        <br/><br/><br/><br/>
        <br/><br/><br/><br/>
      </div>
      <NewResponsiveWindow
        isOpen={isDeckEditWindowOpen}
        title={editDeck?.name}
        initialPosition={{ x: 900, y: 500 }}
        initialSize={{ width: 700, height: 400 }}
        onClose={closeNewDeckWindow}
      >
        <DeckEdit
                  deck={editDeck}
                  updateDeckInfo={updateDeckInfo}
        />
      </NewResponsiveWindow>
    </div>
  );
};