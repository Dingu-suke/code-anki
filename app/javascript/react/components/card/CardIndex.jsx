import React, { useEffect, useRef, useState } from 'react';
import { useCards } from '../../hooks/useCards';
import ResponsiveWindow from '../window/ResponsiveWindow';
import { CardEditForm } from '../form/CardEditForm';
import { LANGUAGE_LABELS, LanguageIcon } from '../runCodeEditorDaisyUI/constants';
import { CheckCard } from './CheckCard';
import { LanguageLabel, LanguageSelector } from '../runCodeEditorDaisyUI/LanguageController';
import { NewResponsiveWindow } from '../window/NewResponsiveWindow';
import CardForm from '../form/CardForm';

const titleCell = "py-3 pr-4 pl-8 w-96 truncate text-start"
const langCell = "py-3 px-2 w-28 truncate text-center"
const dateCell = "py-3 px-2 w-48 truncate text-center"

export const CardList = () => {
  const [language, setLanguage] = useState('')
  const [isNewWindowOpen, setIsNewWindowOpen] = useState(false);
  const [isEditWindowOpen, setIsEditWindowOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const prevSelectedCardRef = useRef(null)
  
  const { cards, setCards,
          isLoading, setIsLoading,
          filteredCards, setFilteredCards,
          searchCard, setSearchCard, selectedLanguage
        } = useCards(language);

  useEffect(() => {
    // 🍉
    prevSelectedCardRef.current = selectedCard
  }, [selectedCard])
  
  const onSelect = (newLanguage) => {
    setLanguage(LANGUAGE_LABELS[newLanguage]);
  };
  
  const openNewWindow = () => {
    setIsNewWindowOpen(true)
    setIsEditWindowOpen(false)
    setSelectedCard(null)
  }
  const openEditWindow = (card) => {
    setIsNewWindowOpen(false)
    const currentlySelectedState = selectedCard && selectedCard.id === card.id // boolean
    setSelectedCard(currentlySelectedState ? null : card)
    setIsEditWindowOpen(!currentlySelectedState)
    // 🍉 useEffect で更新
  }
  const closeNewWindow = () => {  
    setIsNewWindowOpen(false);
  }
  const closeEditWindow = () => {
    setSelectedCard(null)
    setIsEditWindowOpen(false)
  }

  // カード更新時にカード一覧を再レンダリングさせる
  const handleCardUpdate = (updatedCard) => {
    setSelectedCard(updatedCard);
    setCards(prevCards =>
      prevCards.map(card => card.id === updatedCard.id ? updatedCard : card)
    );
  };

  const handleSearch = (e) => {
    setSearchCard(e.target.value);
  }
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="container p-4">
        <div className="p-5 border border-cyan-900 rounded max-w-[660px]">
        <div className="grid grid-cols-12">
          <div className="col-start-1 col-span-7">
            <input
              type="text"
              placeholder="カードを検索"
              value={searchCard}
              onChange={handleSearch}
              className="w-full p-2 mb-4 border rounded 
                      text-cyan-100 bg-gray-700 border-blue-900
                      focus:border-blue-800 focus:border-2  focus:outline-none"
            />
          </div>
          <div className="col-span-2 flex justify-center mb-4">
            <LanguageSelector language={language} onSelect={onSelect} />
          </div>
            <button
              className="col-span-3 max-w-32 p-2 rounded-md bg-slate-900 border border-pink-500 text-pink-500 hover:bg-slate-800 truncate mb-4"
              onClick={() => openNewWindow()}
              >
              + New Card
            </button>
        </div>
        <div className="">
          <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded overflow-hidden max-w-[650px]">
            <div className="h-[calc(75vh-2rem)] overflow-auto">
              <div>
                <table className="w-full text-sm text-left text-gray-300">
                  <thead className="text-xs uppercase bg-gray-700 text-gray-300 sticky top-0 z-10">
                    <tr>
                      <th scope="col" className={`${titleCell}`}>カード名</th>
                      <th scope="col" className={`${langCell}`}>言語</th>
                      <th scope="col" className={`${dateCell}`}>最終更新日</th>
                    </tr>
                  </thead>
                  <tbody>
                  {filteredCards.map((card) => (
                    <tr
                    key={card.id}
                    className={`border-b bg-gray-800 border-gray-700 ${selectedCard && selectedCard.id === card.id ? 'bg-indigo-900 hover:bg-blue-900' : 'hover:bg-cyan-900'}`}
                    onClick={() => { openEditWindow(card);}}
                  >
                      <td className={`${titleCell} font-medium text-cyan-400`}>
                        <div>
                          {card.title}
                        </div>
                      </td>
                      <td className={`${langCell}`}>
                        <div className="flex items-center justify-center">
                          {card.language ? <LanguageIcon language={card.language} /> : ""}
                        </div>
                      </td>
                      <td className={`${dateCell}`}>
                      <div>
                        {new Date(card.updated_at).toLocaleDateString()}
                      </div>

                      </td>
                    </tr>
                  ))}
                    
                  </tbody>
                </table>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                
                </div>
                <NewResponsiveWindow
                  isOpen={isEditWindowOpen}
                  title={selectedCard?.title}
                  initialPosition={{ x: 900, y: 500 }}
                  initialSize={{ width: 740, height: 700 }}
                  onClose={closeEditWindow}
                >
                  <CardEditForm
                      useInWindow={true}
                      selectedCard={selectedCard}
                      setSelectedCard={setSelectedCard}
                      setCards={setCards}
                      onUpdateSuccess={handleCardUpdate}
                      setIsEditWindowOpen={setIsEditWindowOpen}
                    />
                </NewResponsiveWindow>

                <NewResponsiveWindow
                  isOpen={isNewWindowOpen}
                  title={"New Card"}
                  initialPosition={{ x: 900, y: 500 }}
                  initialSize={{ width: 740, height: 700 }}
                  onClose={closeNewWindow}
                >
                  <CardForm 
                      useInWindow={true}
                      filteredCards={filteredCards}
                      setFilteredCards={setFilteredCards}
                    />
                </NewResponsiveWindow>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  )
}