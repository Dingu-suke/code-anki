import React, { useEffect, useRef, useState } from 'react';
import { useCards } from '../../hooks/useCards';
import ResponsiveWindow from '../window/ResponsiveWindow';
import { CardEditForm } from '../form/CardEditForm';
import { LANGUAGE_LABELS, LanguageIcon } from '../runCodeEditorDaisyUI/constants';
import { CheckCard } from './CheckCard';
import { LanguageLabel, LanguageSelector } from '../runCodeEditorDaisyUI/LanguageController';
import { NewResponsiveWindow } from '../window/NewResponsiveWindow';
import CardForm from '../form/CardForm';
import { Toast, useToast } from '../toast/Toust';
import { Drawer } from '../drill/Drawer';

const titleCell = "py-3 pr-4 pl-8 w-96 truncate text-start"
const langCell = "py-3 px-2 w-28 truncate text-center"
const dateCell = "py-3 px-2 w-48 truncate text-center"

export const CardList = () => {
  const [language, setLanguage] = useState('')
  const [isNewCardDrawerOpen, setIsNewCardDrawerOpen] = useState(false);
  const [isEditCardDrawerOpen, setIsEditCardDrawerOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const containerRef = useRef(null); 

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

  const { toast, showToast } = useToast();
  
  const onSelect = (newLanguage) => {
    setLanguage(LANGUAGE_LABELS[newLanguage]);
  };
  
  const openNewWindow = () => {
    // setIsNewDrawerOpen(true)
    setIsEditCardDrawerOpen(false)
    setSelectedCard(null)
  }

  const openEditDrawer = (card) => {
    setIsNewCardDrawerOpen(false)
    setIsEditCardDrawerOpen(true)
    setSelectedCard(card)
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

  const handleSelectCard = () => {
    setIsNewCardDrawerOpen(true);  // ドロワーを開く
    setSelectedCard(null)
  };

  const openNewDrawer = () => {
    if (selectedCard) {
      setIsEditCardDrawerOpen(true);
    } else {
      setIsNewCardDrawerOpen(true);
    }
  }

  const openCardEditDrawer = () => {
    isEditCardDrawerOpen
  }

  const handleCloseDrawer = () => {
    setIsNewCardDrawerOpen(false);
    setIsEditCardDrawerOpen(false)
  };
  
  const isDrawerOpen = isNewCardDrawerOpen || isEditCardDrawerOpen

  return (
    <div ref={containerRef}>
      <div className="z-[1000]">
        {toast.show && <Toast message={toast.message} type={toast.type} />}
      </div>
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
              onClick={() => handleSelectCard()}
              >
              カード +作成
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
                    onClick={() => { openEditDrawer(card);}}
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
                <div className="flex justify-center">
                  {filteredCards.length == 0 &&
                  (
                  <button
                    className="col-span-3 max-w-32 p-2 rounded-md bg-slate-900 border border-pink-500 text-pink-500 hover:bg-slate-800 truncate mb-4"
                    onClick={() => handleSelectCard()}
                    >
                    カード +作成
                  </button>
                  )
                  }
                </div>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                
              </div>
                
                <Drawer
                  isOpen={isDrawerOpen} 
                  onClose={handleCloseDrawer}
                  onOpen={openNewDrawer}
                  containerRef={containerRef}
                  // displayName={selectedCard?.name}
                  displayName={selectedCard ? `カード編集 / 削除` : 'カード新規作成'}
                  className="z-[60]"
                  >
                    {isDrawerOpen == isEditCardDrawerOpen ? (
                      <CardEditForm
                        useInWindow={true}
                        selectedCard={selectedCard}
                        setSelectedCard={setSelectedCard}
                        setCards={setCards}
                        onUpdateSuccess={handleCardUpdate}
                        setIsEditWindowOpen={setIsEditCardDrawerOpen}
                        showToast={showToast}
                      />
                    ) : (
                      <CardForm 
                          useInWindow={true}
                          filteredCards={filteredCards}
                          setFilteredCards={setFilteredCards}
                          showToast={showToast}
                      />
                    ) }
                </Drawer>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  )
}