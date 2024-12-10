import React, { useEffect, useState } from 'react';
import { AiTwotoneTags } from "react-icons/ai";
import { IoWarning } from "react-icons/io5";
import { CATEGORY, LanguageIcon } from '../runCodeEditorDaisyUI/constants';
import { algorithmColor, baseLearningColor, methodLearningColor, refactoringColor, tradeOffColor } from '../../tabStylesAndFunc/styleClass';
import { Toggle } from '../toggle/Toggle';
import { YourDecksIndex } from './YourDecksIndex';

export const SelectedDeckDisplay = ({   

            selectedDeck,
            setSelectedDeck,
            checkedCards,
            setCheckedCards,
            filteredDecks,
            updateDeckInfo,
            isDeckLoading,
            searchTerm,
            error,
            addDeck,
            deleteDeck,
            setSelectedLanguage,
            setSelectedCategory,
            setStatus,
            setSearchTermAndFilter,
            reRenderDeckList,
            showToast

}) => {
  useEffect(() => {
  }, [selectedDeck]);

  const [modal, setModal] = useState(false)

  return (
    <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded-b overflow-hidden">
      <div className="h-[130px]">
        <div className="text-cyan-400 p-2 h-full">
          <div
            className="relative cursor-pointer group h-full"
            onClick={() => console.log("debug")}
          >
            <div className="grid grid-rows-12 grid-cols-6 h-full gap-1">
              {/* 上部セクション */}
              <div className="row-start-1 row-span-6 col-span-6" >
                <div className={`border ${
                  selectedDeck ? "border-blue-800 hover:border-blue-700" : "border-slate-700 hover:border-slate-500"
                } bg-stone-950 text-cyan-50 rounded h-full`}
                  onClick={()=>document.getElementById('my_modal_2').showModal()} 
                  >
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
                  <dialog id="my_modal_2" className="modal">
                    <div className="modal-box text-black bg-slate-800 max-w-5xl">
                    <YourDecksIndex
                        selectedDeck={selectedDeck} setSelectedDeck={setSelectedDeck}
                        checkedCards={checkedCards} setCheckedCards={setCheckedCards}
                        filteredDecks={filteredDecks}
                        updateDeckInfo={updateDeckInfo}
                        isDeckLoading={isDeckLoading}
                        searchTerm={searchTerm}
                        error={error}
                        addDeck={addDeck}
                        deleteDeck={deleteDeck}
                        setSelectedLanguage={setSelectedLanguage}
                        setSelectedCategory={setSelectedCategory}
                        setStatus={setStatus}
                        setSearchTermAndFilter={setSearchTermAndFilter}
                        reRenderDeckList={reRenderDeckList}
                        showToast={showToast}
                      />
                      <div className="flex justify-center">
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