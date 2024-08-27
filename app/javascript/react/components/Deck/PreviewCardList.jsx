import { useCallback, useEffect, useRef, useState } from "react";
import React from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export const PreviewCardList = ({checkedCards, setCheckedCards, previewCard, setPreviewCard }) => {
  
  const scrollContainerRef = useRef(null)
  const prevCheckedCardsLengthRef = useRef(checkedCards.length);
  
  useEffect(() => {
    const currentLength = checkedCards.length;
    const prevLength = prevCheckedCardsLengthRef.current;

    if (currentLength > prevLength && scrollContainerRef.current) {
      const maxScrollLeft = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollTo({
        left: maxScrollLeft,
        behavior: 'smooth'
      });
    }

    // 現在の長さを保存して、次回の比較に使用
    prevCheckedCardsLengthRef.current = currentLength;
  }, [checkedCards]);

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

  const onDragEnd = useCallback((result) => {
    if (!result.destination) {
      return;
    }

    const newItems = Array.from(checkedCards);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setCheckedCards(newItems);
  }, [checkedCards]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-4">
        <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded overflow-hidden">
          <div className="h-[calc(18vh-2rem)]">
            <div className="flex flex-col overflow-x-auto">
              <Droppable droppableId="checkedCards" direction="horizontal">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-stone-950 text-cyan-50 rounded overflow-hidden"
                  >
                    <div className="p-1 m-1">
                      {checkedCards && checkedCards.length > 0 && (
                        <div 
                          className="space-x-4 overflow-x-auto flex justify-start items-start"
                          ref={scrollContainerRef}
                        >
                          <div className='flex flex-col'>
                          <ul className="steps steps-horizontal w-max min-w-full">
                              {checkedCards.map((card, index) => (
                                <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
                                  {(provided) => (
                                    <li
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`step flex flex-col ${(index+1) % 5 === 0 ? "step-primary" : "step-primary"}`}
                                      style={{
                                        backgroundColor: (index+1) % 5 === 0 ? "#631166" : "#0f3c63",
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                      <span></span>
                                      <div
                                        className={`flex-shrink-0 w-48 border p-4 m-2 rounded shadow hover:bg-slate-950
                                          ${card === previewCard ? 'bg-slate-950 border-green-400 text-green-400 hover:text-green-400' : 'bg-slate-950 border-cyan-900 text-cyan-400 hover:text-green-400 hover:border-green-700'}
                                        `}
                                        onClick={() => setPreviewCard(card)}
                                      >
                                        <h2 className="text-xl text-center font-semibold truncate">
                                          {card.title}
                                        </h2>
                                      </div>
                                    </li>
                                  )}
                                </Draggable>
                              ))}
                            </ul>
                          </div>
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
  );
};
