import React, { useEffect } from 'react';
import { AiTwotoneTags } from "react-icons/ai";
import { IoWarning } from "react-icons/io5";
import { CATEGORY } from '../RunCodeEditorDaisyUI/constants'

export const SelectedDeckDisplay = ({ selectedDeck }) => {
  useEffect(() => {

  }, [selectedDeck])
  return(
    <>
    <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded-t overflow-hidden border-b-transparent">
      {selectedDeck
        ? <div className="flex items-center justify-center overflow-hidden">
            <div className="w-full bg-slate-800 py-1 text-xs font-semibold truncate">選択中デッキ</div>
        </div>
        : <div className="flex items-center justify-center overflow-hidden">
            <div className="w-full bg-slate-800 py-1 text-xs font-semibold truncate">デッキ未選択</div>
        </div>
        }
    </div>
    <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded-b overflow-hidden border-t-transparent">
      <div className="h-[calc(15.2vh-2rem)]">
        <div className="text-cyan-400 p-2">
          <div
            className="relative w-full h-full cursor-pointer group"
            onClick={() => console.log(selectedDeck)}
          >
            <div className={`border h-hull ${selectedDeck ? "border-blue-500 hover:border-blue-600" : "border-slate-700 hover:border-slate-500"} bg-stone-950 text-cyan-50 rounded h-[calc(13.7vh-2rem)] truncate`}>
              <div className={`overflow-hide h-full ${selectedDeck ? "flex flex-col" : "flex items-center justify-center"}`}>
                {selectedDeck
                  ? (
                    <div className="grid grid-rows-3 grid-cols-6 w-full h-full ">
                      <div className="row-start-1 row-span-1 col-start-1 col-span-6 px-2 text-xl flex overflow-hidden items-center">
                        <div className="bg-stone-950 text-cyan-300 rounded truncate">
                          {selectedDeck.name}
                        </div>
                      </div>
                      <div className="bg-blue-800 text-blue-100 text-xs font-medium mr-2 px-2.5 rounded row-start-2 row-span-1 col-start-2 col-span-2 flex items-center justify-center py-3 my-2">
                        {selectedDeck.cards ? selectedDeck.cards.length : ""}
                      </div>
                      <div className="row-start-3 row-span-1 col-start-1 col-span-1 flex overflow-hidden items-center justify-center">
                        <div className="bg-stone-950 text-cyan-300 rounded truncate px-1">
                          <AiTwotoneTags />
                        </div>
                      </div>
                      <div className="row-start-3 row-span-1 col-start-2 col-span-5 flex overflow-hidden items-center ">
                        <div className="bg-stone-950 text-cyan-300 rounded truncate">
                          {selectedDeck ? CATEGORY[`${selectedDeck.category}`] : ""}
                        </div>
                      </div>
                    </div>
                  )
                  : (
                    <div className="flex items-center justify-center h-full">
                      <IoWarning className="text-[3rem] font-semibold text-slate-600" />
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}