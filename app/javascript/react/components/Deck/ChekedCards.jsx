import { useEffect, useRef } from "react";
import React from 'react';

export const CheckedCards = ({ checkedCards, selectedCard  }) => {
  
  const scrollContainerRef = useRef(null);
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft } = scrollContainerRef.current;
      const stepsContainer = document.querySelector('.steps-container');
      if (stepsContainer) {
        stepsContainer.scrollLeft = scrollLeft;
      }
    }
  };
  
  useEffect(() => {
    if (scrollContainerRef.current) {
      const maxScrollLeft = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollLeft = maxScrollLeft;
    }
  }, [checkedCards]);

  return (
    <div className="p-4">
      <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded overflow-hidden">
        <div className="h-[calc(21vh-2rem)] overflow-auto">
          <div className="flex flex-col overflow-x-auto">
              <div className="bg-stone-950 text-cyan-50 rounded overflow-hidden">
                <div className="p-2 m-1">
                  {checkedCards && checkedCards.length > 0 && (
                    <div 
                      className="space-x-4 overflow-x-auto pb-4 flex justify-start items-start"
                      ref={scrollContainerRef}
                      onScroll={handleScroll}
                    >
                      <div className='flex flex-col'>
                        <ul className="steps steps-horizontal w-max min-w-full">
                          {checkedCards.map((card, index) => (
                            // Flexコンテナを作成、flex-directionをcolumnにして子要素を縦並びにする
                            <li
                            key={index}
                            className={`step flex flex-col ${(index+1) % 5 === 0 ? "step-primary" : "step-primary"}`}
                            style={{
                              backgroundColor: (index+1) % 5 === 0 ? "#631166" : "#0f3c63", // インラインスタイルで背景色を変更
                            }}
                          >
                              <span></span>
                              <div
                                key={card.id}
                                className={`flex-shrink-0 w-48 border hover:border-cyan-300 p-4 m-2 rounded shadow hover:bg-indigo-900
                                ${card === selectedCard ? 'bg-indigo-900 border-green-500' : 'bg-indigo-950 border-cyan-600'}`}
                                onClick={() => opneCardWindow(card)}
                              >
                                <h2 className="text-xl text-center font-semibold text-cyan-300 truncate">
                                  {card.title}
                                </h2>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  { checkedCards.length > 0 || (
                    <>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}