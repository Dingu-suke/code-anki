import React, { useEffect, useState } from 'react';
import { useYourDeckList } from '../../hooks/useYourDeckList';

export const DeckTable = ({ filteredDecks, onClick, selectedDeck, fetchDecks }) => {
  const [localDecks, setLocalDecks] = useState(filteredDecks)

  // useEffect(() => {
  //   setLocalDecks(filteredDecks);
  //   console.log(filteredDecks.length)
  //   console.log(localDecks.length)
  // }, [filteredDecks])

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <button className="btn btn-primary" onClick={fetchDecks}>Decklist 再レンダリング ボタン</button>
        {localDecks.length}
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="text-xs uppercase bg-gray-700 text-gray-300">
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
              className={`border-b bg-gray-800 border-gray-700  ${
                selectedDeck && selectedDeck.id === deck.id ? 'bg-indigo-900 hover:bg-blue-900' : 'hover:bg-cyan-900'
              }`}
              onClick={() => onClick(deck)}
            >
              <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-cyan-400">
                {deck.name}
              </th>
              <td className="px-6 py-4">
                <span className="bg-blue-800 text-blue-100 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                  {deck.cards.length}
                </span>
              </td>
              <td className="px-6 py-4">
                {deck.language ? deck.language : ""}
              </td>
              <td className="px-6 py-4">
                {deck.tag
                ? <span className="bg-blue-800 text-blue-100 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                    {deck.tag ? deck.tag : ""}
                  </span> 
                :
                  <span className=" text-blue-100 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"></span>
                }
              </td>
              <td className="px-6 py-4">
                {new Date(deck.updatedAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                <button className="text-cyan-300 hover:text-cyan-100 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button className="text-red-400 hover:text-red-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};