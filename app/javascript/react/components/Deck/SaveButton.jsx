import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export const SaveButton = ({ selectedDeck, checkedCards, editDeck, fetchDecks }) => {
  const {isLoading, setIsLaoding} = useForm()
  const [error, setError] = useState(null)

  const SaveDeckOrganization = (selectedDeck, checkedCards) => {
    console.log("SaveDeckOrganization")
    editDeck(selectedDeck, checkedCards)
    // fetchDecks()
  }

  return (
    <>
    <div className="pl-2 pr-4">
      <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded-t overflow-hidden border-b-transparent">
        {selectedDeck
          ? <div className="flex items-center justify-center overflow-hidden">
              <div className="py-1 text-xs font-semibold truncate bg-cyan-950 w-full text-center">デッキ編成</div>
            </div>
          : <div className="flex items-center justify-center overflow-hidden">
            <div className="py-1 text-xs font-semibold truncate bg-cyan-950 w-full text-center">デッキ未選択</div>
          </div>
        }
      </div>
    <div className="border border-slate-600 bg-stone-950 text-cyan-50 rounded-b overflow-hidden border-t-transparent">
        <div className="h-[calc(15.2vh-2rem)]">
          {selectedDeck
          ? (
          <div className="flex justify-center items-center w-full h-full px-3">
          <button
            type="button"
            className="font-bold text-lg py-3 px-5 w-32 flex items-center justify-center rounded-sm text-sky-500 bg-slate-900 hover:text-sky-400 hover:bg-indigo-950 border border-sky-800 hover:border-cyan-600 font-courier cursor-default"
            onClick={() => {SaveDeckOrganization(selectedDeck, checkedCards)}}
          >
            更新する
          </button>
        </div>
          )
          : (
          <div className="flex justify-center items-center w-full h-full">
            <button
              type="button"
              
            >
              
            </button>
          </div>
          )
        }
        </div>
      </div>
    </div>
    </>
  )
}