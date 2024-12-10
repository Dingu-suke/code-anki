import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export const SaveButton = ({ selectedDeck, checkedCards, editDeck, fetchDecks }) => {
  const {isLoading, setIsLaoding} = useForm()
  const [error, setError] = useState(null)

  const SaveDeckOrganization = (selectedDeck, checkedCards) => {
    editDeck(selectedDeck, checkedCards)
  }

  return (
    <>
    <div className="pl-2 pr-4">
      </div>
          {selectedDeck
          ? (
          <div className="flex justify-center items-center w-full h-full px-3">
          <button
            type="button"
            className="font-bold text-sm py-3 px-3 w-32 flex items-center justify-center rounded-sm text-sky-500 bg-slate-900 hover:text-sky-400 hover:bg-indigo-950 border border-sky-800 hover:border-cyan-600 font-courier cursor-default"
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
    </>
  )
}