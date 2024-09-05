import React from 'react';
import ResponsiveWindow from '../Window/ResponsiveWindow';

export const SelectCardIndex = (
  { 
    selectedCard, setSelectedCard,
    searchTerm,
    setSearchTerm,
    filteredCards,
    isWindowOpen,
    handleCardClick,
    closeWindow,
    CheckCard,
    handleCheckboxClick }) => {

  return (
  <div className="container mx-auto">
    <h1 className="text-2xl font-bold text-orange-400 font-courier">{/* あなたのカード */}</h1>
      <div className="grid grid-cols-6">
          <input
            type="text"
            id="searchCards"
            name="searchCards"
            placeholder="カードを検索"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value)}}
            className="col-start-1 col-span-4 w-full p-2 pl-3 mb-4 border rounded bg-gray-700 focus:outline-none focus:border-2 focus:border-blue-800 border-blue-900 text-cyan-100"
        />
      </div>
      <div className="col-span-4">
        <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded overflow-hidden">
          <div className="p-6 h-[calc(60vh-2rem)] overflow-auto">

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4" >
              <div className="border border-dashed hover:border-solid border-pink-400 hover:border-pink-400 text-pink-400 p-4 rounded shadow  bg-slate-950 flex items-center">
                <h2 className='text-xl font-semibold'>+ new card</h2>
              </div>
              {filteredCards.map((card) => (
                <div
                key={card.id}
                className={`border hover:border-cyan-300 p-4 rounded shadow hover:bg-indigo-900 
                ${card === selectedCard ? 'bg-indigo-900 border-green-500' : 'bg-indigo-950 border-cyan-600' }`}
                onClick={(event) => handleCardClick(event, card)}
                >
                  <h2 className='text-xl font-semibold '>
                    <div className="grid grid-cols-2">
                      <div className="text-cyan-100 flex items-center">
                        {card.title}
                      <div>
                    </div>
                    </div>
                    <div className="justify-self-end checkbox-container" >
                      <input 
                        type="checkbox"
                        className="checkbox checkbox-lg checkbox-secondary hover:bg-pink-900 m-1 flex items-center"
                        // checked={sedCards.some((c) => c.id === card.id)}
                        onClick={() => handleCheckboxClick(card)}
                        checked={card.isSelected} // カードの選択状態を反映
                        />
                    </div>
                  </div>
                  </h2>
                </div>
              ))}
            </div>
              <br/><br/><br/><br/>
              <br/><br/><br/><br/>
              <br/><br/><br/><br/>
              <br/><br/><br/><br/>
              <br/><br/><br/><br/>
            {isWindowOpen && (
              <ResponsiveWindow
                title={`${selectedCard.title}`}
                initialPosition={{ x: 100, y: 500 }}
                initialSize={{ width: 600, height: 450 }}
                onClose={closeWindow}
              >
                <CheckCard selectedCard={selectedCard} />
              </ResponsiveWindow>
            )}
          </div>
        </div>
      </div>
    </div>    
);
}