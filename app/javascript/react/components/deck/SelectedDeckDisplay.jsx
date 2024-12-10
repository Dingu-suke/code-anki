import React, { useEffect } from 'react';
import { AiTwotoneTags } from "react-icons/ai";
import { IoWarning } from "react-icons/io5";
import { CATEGORY, LanguageIcon } from '../runCodeEditorDaisyUI/constants';
import { algorithmColor, baseLearningColor, methodLearningColor, refactoringColor, tradeOffColor } from '../../tabStylesAndFunc/styleClass';
import { Toggle } from '../toggle/Toggle';

export const SelectedDeckDisplay = ({ selectedDeck }) => {
  useEffect(() => {
  }, [selectedDeck]);

  return (
    <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded-b overflow-hidden">
      <div className="h-[130px]">
        <div className="text-cyan-400 p-2 h-full">
          <div
            className="relative cursor-pointer group h-full"
            onClick={() => console.log(selectedDeck)}
          >
            <div className="grid grid-rows-12 grid-cols-6 h-full gap-1">
              {/* 上部セクション */}
              <div className="row-start-1 row-span-6 col-span-6" >
                <div className={`border ${
                  selectedDeck ? "border-blue-800 hover:border-blue-700" : "border-slate-700 hover:border-slate-500"
                } bg-stone-950 text-cyan-50 rounded h-full`}>
                  <div className={`h-full ${
                    selectedDeck ? "flex flex-col" : "flex items-center justify-center"
                  }`}>
                    {selectedDeck ? (
                      <div className="w-full h-full">
                        <div className="px-2 text-xl h-full">
                          <div className="flex items-center h-full">
                            <div className="flex-1 min-w-0">
                              <div className="bg-stone-950 text-cyan-300 rounded px-2 text-sm truncate">
                                {selectedDeck.name}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        {"デッキ未選択"}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* カード数表示セクション */}
              {selectedDeck && (
              <>
                <div className="row-start-7 row-span-3 col-start-1 col-span-2 w-full">
                  <div className="h-full w-full">
                    <div className={`${selectedDeck?.language && "flex -centitemser justify-center border border-gray-700 rounded-sm"}`}>
                      {selectedDeck?.language ? <LanguageIcon language={selectedDeck.language} size={27} /> : ""}
                    </div>
                  </div>
                </div>
                <div className="row-start-7 row-span-3 col-start-3 col-span-2">
                  <div className="h-full w-full">
                    <div className={`h-full w-full text-sm font-medium rounded flex items-center justify-center px-4 ${
                      selectedDeck.cards?.length > 2
                        ? "border border-lime-900 bg-sky-950 text-yellow-100"
                        : "bg-red-950 text-pink-400 border border-red-900"
                    }`}>
                      {selectedDeck.cards ? selectedDeck.cards.length : 0}
                    </div>
                  </div>
                </div>
                </>
              )}

              {/* カテゴリー表示セクション */}
              <div className="row-start-10 row-span-3 col-start-1 col-span-6">
                <div className={`text-sm font-medium rounded truncate px-4 py-1 
                        ${selectedDeck && selectedDeck?.category && "border border-gray-600"}
                        ${selectedDeck && selectedDeck?.category === "baseLearning" && baseLearningColor}
                        ${selectedDeck && selectedDeck?.category === "methodLearning" && methodLearningColor}
                        ${selectedDeck && selectedDeck?.category === "algorithm" && algorithmColor}
                        ${selectedDeck && selectedDeck?.category === "refactoring" && refactoringColor}
                        ${selectedDeck && selectedDeck?.category === "tradeOff" && tradeOffColor}`}>
                  {selectedDeck ? CATEGORY[`${selectedDeck.category}`] : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedDeckDisplay;