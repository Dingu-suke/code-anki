import React from 'react';

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

  return (
    <div className="overflow-x-auto shadow-lg rounded-md">
      <div className="overflow-y-auto max-h-[500px]"> {/* スクロール可能な高さを設定 */}
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs uppercase bg-gray-700 text-gray-300 sticky top-0 z-10"> {/* stickyヘッダーの設定 */}
            <tr>
              <th scope="col" className="px-6 py-3">デッキ名</th>
              <th scope="col" className="px-6 py-3">カード数</th>
              <th scope="col" className="px-6 py-3">言語</th>
              <th scope="col" className="px-6 py-3">カテゴリ</th>
              <th scope="col" className="px-6 py-3">最終更新日</th>
              <th scope="col" className="px-3 py-3">非公開 / 公開</th>
            </tr>
          </thead>
          <tbody>
            {filteredDecks.map((deck) => (
              <tr
                key={deck.id}
                className={`border-b bg-gray-800 border-gray-700 ${
                  selectedDeck && selectedDeck.id === deck.id ? 'bg-indigo-900 hover:bg-blue-900' : 'hover:bg-cyan-900'
                }`}
                onClick={() => {setDeck(deck)}}
              >
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-cyan-400">
                  {deck.name}
                </th>
                <td className="px-6 py-4">
                  <span className="bg-blue-800 text-blue-100 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                    {deck.cards ? deck.cards.length : 0}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {deck.language || ""}
                </td>
                <td className="px-6 py-4">
                  {deck.category
                  ? <span className="bg-blue-800 text-blue-100 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                      {deck.category}
                    </span> 
                  :
                    <span className="text-blue-100 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"></span>
                  }
                </td>
                <td className="px-6 py-4">
                  {new Date(deck.updated_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {/* ... アクションボタン ... */}
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