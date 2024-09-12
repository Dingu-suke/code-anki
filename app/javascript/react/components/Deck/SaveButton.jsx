import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export const SaveButton = ({ selectedDeck, checkedCards, updateDeck, fetchDecks }) => {
  const {isLoading, setIsLaoding} = useForm()
  const [error, setError] = useState(null)

  const SaveDeckOrganization = (selectedDeck, checkedCards) => {
    console.log("SaveDeckOrganization")
    updateDeck(selectedDeck, checkedCards)
    // fetchDecks()
  }

  return (
    <>
      {selectedDeck
      ? (
      <div className="flex justify-center items-center w-full h-full">
      <button
        type="button"
        className="font-bold text-lg py-3 px-5 w-32 flex items-center justify-center rounded-sm text-sky-500 bg-slate-900 hover:text-sky-400 hover:bg-indigo-950 border border-sky-800 hover:border-cyan-600 font-courier xl:w-auto xl:inline-block cursor-default"
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
          className="font-bold text-lg py-3 px-5 w-32 flex items-center justify-center rounded-sm text-sky-800 border border-sky-800 bg-indigo-950 font-courier xl:w-auto xl:inline-block cursor-default h-[calc(8.8vh-2rem)]"
        >
          
        </button>
      </div>
      )
    }
    </>
  )
}