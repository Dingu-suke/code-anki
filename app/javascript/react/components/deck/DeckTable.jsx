import React, { useState } from 'react';
import { LuPencil } from "react-icons/lu";
import { DeckEdit } from '../form/DeckForm';
import { CATEGORY, LanguageIcon } from '../runCodeEditorDaisyUI/constants';
import { Toggle } from '../toggle/Toggle';
import { NewResponsiveWindow } from '../window/NewResponsiveWindow';

const methodLearningColor = "bg-yellow-950 text-amber-200 bg-opacity-55"
const algorithmColor = "bg-green-950 text-emerald-200"
const refactoringColor = "bg-blue-950 text-cyan-200"
const tradeOffColor = "bg-fuchsia-950 text-pink-200 bg-opacity-60"

const editButtonCell = "py-2 w-10 truncate text-center"
const deckTitleCell = "px-4 py-3 min-w-64 truncate text-start"
const cardsLengthCell = "px-2 py-3 min-w-20 max-w-28 truncate text-center"
const deckLanguageCell = "pl-4 pr-2 py-3 min-w-20 max-w-28 truncate text-center"
const deckCategoryCell = "px-4 py-3 min-w-32 max-w-40 truncate"
const deckUpadateDateCell = "px-4 py-3 min-w-20 max-w-28 truncate text-center"
const deckStatusCell = "px-4 py-3 min-w-28 max-w-40 truncate text-center"

export const DeckTable = (
    { 
      checkedCards,
      setCheckedCards,
      filteredDecks,
      updateDeckInfo,
      deleteDeck,
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
              <th scope="col" className={`${editButtonCell}`}></th>
              <th scope="col" className={`${deckTitleCell}`}>デッキ名</th>
              <th scope="col" className={`${cardsLengthCell}`}>カード数</th>
              <th scope="col" className={`${deckLanguageCell}`}>言語</th>
              <th scope="col" className={`${deckCategoryCell}`}>カテゴリ</th>
              <th scope="col" className={`${deckUpadateDateCell}`}>最終更新日</th>
              <th scope="col" className={`${deckStatusCell}`}>公開 / 非公開</th>
            </tr>
          </thead>
          <tbody>
              {/* <div className="text-center py-4">デッキがありません</div> */}            
            {filteredDecks.map((deck) => (
              <tr
                key={deck.id}
                className={`border-b bg-gray-800 border-gray-700 ${
                  selectedDeck && selectedDeck.id === deck.id ? 'bg-indigo-900 hover:bg-blue-900' : 'hover:bg-cyan-900'
                }`}
                onClick={(event) => {handleClickConditions(event, deck)}} 
              >
                <td scope="row"
                    className="font-medium whitespace-nowrap text-gray-400 min-w-4 js-edit-icon hover:text-red-400"
                    onClick={(event) => {
                                      event.stopPropagation();
                                      handleEditDeck(deck)
                                    }}
                  >
                    <div className={`${editButtonCell} flex items-center justify-center`}>
                      <LuPencil />
                    </div>
                </td>
                <td scope="row" className={`${deckTitleCell} ml-3 font-medium whitespace-nowrap text-cyan-400`}>
                  {deck.name}
                </td>
                <td className={`${cardsLengthCell}`}>
                  <div className="flex justify-center items-center">
                    <div className={`
                      text-sm font-medium rounded min-w-8 text-center
                      ${deck.cards?.length > 4
                        ? "border border-lime-900 bg-sky-950 text-green-400"
                        : "bg-red-950 text-pink-400 border border-red-900" }`
                      }>
                      {deck.cards ? deck.cards.length : 0}
                    </div>
                  </div>
                </td>
                <td className={`${deckLanguageCell}`}>
                  <div className="flex items-center justify-center">
                    {deck.language ? <LanguageIcon language={deck.language} /> : ""}
                  </div>
                </td>
                <td className={`${deckCategoryCell} flex justify-start`}>
                  <div>
                    {deck.category
                    ? 
                    <div className={`inline-block text-xs font-medium rounded truncate
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
                  </div>
                </td>
                <td className={`${deckUpadateDateCell}`}>
                  {new Date(deck.updated_at).toLocaleDateString()}
                </td>
                <td className={`${deckStatusCell}`}>
                  <div className="flex justify-center">
                    <Toggle initialStatus={deck.status} deck={deck}/>
                  </div>
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
                  deleteDeck={deleteDeck}
                  setCheckedCards={setCheckedCards}
                  updateDeckInfo={updateDeckInfo}
                  setIsDeckEditWindowOpen={setIsDeckEditWindowOpen}
        />
      </NewResponsiveWindow>
    </div>
  );
};