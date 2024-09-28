import React from 'react';
import { Toggle } from '../Toggle/Toggle';
import { LanguageIcon, CATEGORY } from '../RunCodeEditorDaisyUI/constants';

const methodLearningColor = "bg-yellow-950 text-amber-200 bg-opacity-55"
const algorithmColor = "bg-green-950 text-emerald-200"
const refactoringColor = "bg-blue-950 text-cyan-200"
const tradeOffColor = "bg-fuchsia-950 text-pink-200 bg-opacity-60"
export const DeckTable = ({ checkedCards, setCheckedCards, filteredDecks, selectedDeck, setSelectedDeck, handleCheckCardsOfDeck, reRenderDeckList }) => {
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

  const handleClickToggleSwitch = (event, deck) => {
    console.log('handleClickToggleSwitch called', event.target);
    if (!event.target.closest('.js-toggle-button')) {
      setDeck(deck)
    }
  }

  return (
    <div className="shadow-lg rounded-md">
      <div className="overflow-y-auto max-h-[500px] min-h-[500px]"> {/* スクロール可能な高さを設定 */}
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs uppercase bg-gray-700 text-gray-300 sticky top-0 z-10"> {/* stickyヘッダーの設定 */}
            <tr className=''>
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
                onClick={(event) => {handleClickToggleSwitch(event, deck)}}
                
              >
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-cyan-400 min-w-20">
                  {deck.name}
                </th>
                <td className="px-4 py-3 min-w-20">
                  <span className="bg-blue-800 text-blue-100 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                    {deck.cards ? deck.cards.length : 0}
                  </span>
                </td>
                <td className="px-8 py-3 min-w-20">
                  {deck.language ? <LanguageIcon language={deck.language} /> : ""}
                </td>
                <td className="px-4 py-3 min-w-20">
                  {deck.category
                  ? 
                  <div className={`text-xs font-medium ml-1 px-2 rounded truncate
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
                  {deck.status}
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
    </div>
  );
};