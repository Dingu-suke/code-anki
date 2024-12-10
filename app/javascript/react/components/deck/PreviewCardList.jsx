import { useCallback, useEffect, useRef, useState } from "react";
import React from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { SelectCardIndex } from "./SelectCardIndex";

export const PreviewCardList = ({
    checkedCards, 
    setCheckedCards,
    previewCard,
    setPreviewCard,
    selectedDeck,
    selectedCard,
    searchCard,
    setSearchCard,
    filteredCards,
    isWindowOpen,
    closeWindow,
    handleCardClick,
    handleCardUpdate,
    updateDeckAndCard,
    setActiveTab }) => {
  
  const scrollContainerRef = useRef(null)
  const prevCheckedCardsLengthRef = useRef(checkedCards?.length);
  const prevSelectedDeckRef = useRef(selectedDeck);
  const prevChekedCardsRef = useRef([])
  const checkedCardsRef = useRef(checkedCards)
  const [cardOrder, setCardOrder] = useState([]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      if (selectedDeck !== prevSelectedDeckRef.current) {
        // selectedDeck が変更されたときは左端にスクロール
        scrollContainerRef.current.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else {
        const currentLength = checkedCards.length;
        const prevLength = prevCheckedCardsLengthRef.current;

        if (currentLength > prevLength) {
          // checkedCards の要素数が増えたときのみ右端にスクロール
          const maxScrollLeft = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
          scrollContainerRef.current.scrollTo({
            left: maxScrollLeft,
            behavior: 'smooth'
          });
        }
      }
    }

    // 現在の値を保存して、次回の比較に使用
    prevCheckedCardsLengthRef.current = checkedCards?.length;
    prevSelectedDeckRef.current = selectedDeck;
  }, [checkedCards, selectedDeck]);
  
  // カードを編集したときにDOMにも変更を反映
  useEffect(() => {
    if (selectedDeck && selectedDeck.cards && selectedDeck.deck_cards) {
      // position順にカードをソート
      const sortedCards = [...selectedDeck.cards].sort((a, b) => {
        const positionA = selectedDeck.deck_cards.find(dc => dc.card_id === a.id)?.position || 0;
        const positionB = selectedDeck.deck_cards.find(dc => dc.card_id === b.id)?.position || 0;
        return positionA - positionB;
      });
      
      setCheckedCards(sortedCards);
    }
  }, [selectedDeck]);

  useEffect(() => {
    if (checkedCards.length > 0 && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const isScrollable = container.scrollWidth > container.clientWidth;
      // コンテンツの幅がコンテナの幅よりも大きい場合、スクロールが可能と判断
      
      if (isScrollable) {
        const index = checkedCards.findIndex(card => card.id === previewCard.id);
        const cardsLength = checkedCards.length;
        
        // スクロールの割合を計算（0 から 1 の間）
        const scrollFraction = index / (cardsLength - 1);
        
        // スクロール可能な最大幅を計算
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        
        // 目標のスクロール位置を計算
        const targetScrollLeft = scrollFraction * maxScrollLeft;

        // スムーズにスクロール
        container.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [previewCard]);
  
  // ------------------------------------------------

  const updateCardOrder = useCallback(() => {
    const newOrder = checkedCards?.map((card, index) => ({
      ...card,
      order: index + 1
    }));
    setCardOrder(newOrder);
  }, [checkedCards]);
  
  useEffect(() => {
    updateCardOrder();
  }, [checkedCards, updateCardOrder]);

  // ------------------------------------------------
  
  // ドラッグ ドロップ 実行関数 配列で順序を監視
  const onDragEnd = useCallback((result) => {
    if (!result.destination) {
      return;
    }
    const newItems = Array.from(checkedCards);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setCheckedCards(newItems);
  }, [checkedCards]);

  const getStepColor = (index) => {
    return (index + 1) % 5 === 0 ? "#631166" : "#0f3c63";
  };

  return (
    <div>
      {selectedDeck && 
      (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="py-4 pl-2 pr-2">
            <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded overflow-hidden">
              <div className="h-[130px]">
                <div className="flex flex-col overflow-x-auto">
                  <Droppable droppableId="checkedCards" direction="horizontal">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="bg-stone-950 text-cyan-50 rounded overflow-hidden"
                      >
                        <div className="px-1 py-3 mx-1 my-3">
                          {checkedCards && checkedCards.length > 0 ? (
                            <div
                              className="space-x-4 overflow-x-auto flex justify-start items-start"
                              ref={scrollContainerRef}
                            >
                              <div className="flex-col">

                                <div className='flex flex-col'>
                                  <ul className="flex w-max min-w-full relative">
                                    {checkedCards.map((card, index) => (
                                    <li key={card.id} className="relative">
                                      <div
                                        className="flex-shrink-0 w-32 mx-2 rounded shadow hover:bg-slate-950"
                                        onClick={() => setPreviewCard(card)}
                                      >
                                          {/* 接続線 - 最初以外の要素に対して左線を表示 */}
                                          {index !== 0 && (
                                            <div className="absolute top-1/2 left-0 w-1/2 h-0.5 bg-sky-800 -translate-y-1/2" />
                                          )}
                                          {/* 接続線 - 最後以外の要素に対して右線を表示 */}
                                          {index !== checkedCards.length - 1 && (
                                            <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-sky-800 -translate-y-1/2" />
                                          )}
                                          
                                          <div className="flex justify-center relative z-10">
                                            <div className={`
                                              w-10 h-8
                                              flex items-center justify-center
                                              rounded-full
                                              ${(index + 1) % 5 === 0 
                                                ? "border-2 border-fuchsia-900 bg-fuchsia-950" 
                                                : "border-2 border-sky-800 bg-cyan-950"}
                                              relative
                                            `}>
                                              <span className="text-md font-semibold text-gray-400">
                                                {index + 1}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* ドラッグ&ドロップができるカード群 ↓ */}

                                <div className='flex flex-col'>
                                  <ul className="flex w-max min-w-full">
                                    {checkedCards.map((card, index) => (
                                        <li
                                          key={card.id}
                                          className={``}
                                          data-content={`${index+1}`}
                                        >                                    
                                          <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
                                            {(provided, snapshot) => (
                                            <div
                                              {...provided.dragHandleProps}
                                              className={`flex-shrink-0 w-32 border p-2 m-2 rounded shadow hover:bg-slate-950
                                                ${card === previewCard ? 'bg-slate-950 border-green-400 text-green-400 hover:text-green-400' : 'bg-slate-950 border-cyan-900 text-cyan-400 hover:text-green-400 hover:border-green-700'}
                                                ${snapshot.isDragging ? 'opacity-50' : ''}
                                              `}
                                              onClick={() => setPreviewCard(card)}
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                            >
                                              <h2 className="text-sm text-center font-semibold truncate">
                                                {card.title}
                                              </h2>
                                            </div>
                                            )}
                                          </Draggable>
                                        </li>
                                    ))}
                                  </ul>
                                </div>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center ">
                                <div className="w-40 rounded-md p-5 border border-gray-500 hover:border-teal-600 hover:text-green-500 text-gray-400 text-center cursor-default"
                                      onClick={
                                        () => {
                                          document.getElementById('my_modal_1').showModal()
                                          setActiveTab('cardIndex')
                                        }
                                        
                                        }>
                                  {"カード未選択"}
                                </div>
                                <dialog id="my_modal_1" className="modal">
                                  <div className="modal-box text-black bg-slate-800 max-w-5xl p-2">
                                      <SelectCardIndex
                                        selectedCard={selectedCard}
                                        searchCard={searchCard}
                                        setSearchCard={setSearchCard}
                                        filteredCards={filteredCards}
                                        isWindowOpen={isWindowOpen}
                                        closeWindow={closeWindow}
                                        handleCardClick={handleCardClick}
                                        // CheckCard={CheckCard}
                                        checkedCards={checkedCards}
                                        setCheckedCards={setCheckedCards}
                                        handleCardUpdate={handleCardUpdate}
                                        updateDeckAndCard={updateDeckAndCard}
                                        selectedDeck={selectedDeck}
                                      />
                                    <div className="flex justify-center p-3">
                                      <form method="dialog">
                                        <button
                                          type="submit"
                                          className="btn text-sky-400 px-20 bg-cyan-950 hover:text-sky-300 hover:bg-blue-950 border border-sky-800 hover:border-cyan-500 font-courier xl:w-auto hidden xl:inline-block w-max-96"
                                        >
                                            とじる
                                        </button>
                                      </form>
                                    </div>
                                    </div>
                                  <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                  </form>
                                </dialog>
                              </div>
                            )}
                            {provided.placeholder}
                          </div>
                        </div>
                      )}
                    </Droppable>
                  </div>
                </div>
              </div>
            </div>
          </DragDropContext>
        )
      }
    </div>
  );
};


