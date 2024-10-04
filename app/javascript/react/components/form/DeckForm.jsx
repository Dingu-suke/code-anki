import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CATEGORY, LANGUAGE_LABELS } from '../RunCodeEditorDaisyUI/constants';
import { setupCSRFToken } from './setupCSRFToken';
import { useYourDeckList } from '../../hooks/useYourDeckList';
import { FaTrashCan } from "react-icons/fa6";


const errors = {
  deck : "デッキ名は必須です"
}

export const DeckNew = ({ addDeck, onSuccess }) => {
  const { register, handleSubmit, formState: {errors}, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      name: '',
      category: '',
      language: '',
      cards: []
    }
  });
  useEffect(() => {
    setupCSRFToken();
  }, []);

  const onSubmit = async (data) => {
    const newDeck = await addDeck(
      {
        ...data,
        cards_id: []
      }
    );
    if (newDeck) {
      reset(); // フォームをリセット
      if (onSuccess) onSuccess(newDeck); // 成功時のコールバック
    }
  };

  return(
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-6 p-3">
          <label htmlFor="name" className="col-start-1 col-span-1 flex items-center justify-items-center text-cyan-200">デッキ名</label>
            <input
              {...register("name", {required: "デッキ名は必須です" })}
              id="name"
              name="name"
              type="text"
              className="px-4 col-start-2 col-span-4 w-full py-2 rounded bg-gray-800 focus:outline-none focus:ring border-gray-700 border-2 text-cyan-100"
            />
          </div>

          <div className="grid grid-cols-6 p-3">
            <label htmlFor="selectTag" className="col-start-1 col-span-1 flex items-center justify-items-center text-cyan-200">カテゴリ</label>
            <select
              {...register("category")}
              id="category"
              name="category"
              className="col-start-2 col-span-4 px-3 py-2 rounded bg-gray-800 focus:outline-none focus:ring border-gray-700 border-2 text-cyan-100"
            >
              <option value="">( 未選択 )</option>
              <option value="methodLearning">{CATEGORY["methodLearning"]}</option>
              <option value="algorithm">{CATEGORY["algorithm"]}</option>
              <option value="refactoring">{CATEGORY["refactoring"]}</option>
              <option value="tradeOff">{CATEGORY["tradeOff"]}</option>
            </select>
          </div>
          <div className="grid grid-cols-6 p-3">
            <label htmlFor="selectTag" className="col-start-1 col-span-1 flex items-center justify-items-center text-cyan-200">言語</label>
            <select
              {...register("language")}
              id="language"
              name="language"
              className="col-start-2 col-span-4 px-3 py-2 rounded bg-gray-800 focus:outline-none focus:ring border-gray-700 border-2 text-cyan-100"
            >
              <option value="">( 未選択 )</option>
              {Object.entries(LANGUAGE_LABELS).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-center py-3 text-red-400">
            <p>{errors.name? errors.name.message : <br/>}</p>
          </div>
          
          <div className="flex items-center justify-center">
            <button type="submit" className="font-bold text-lg py-3 px-5 w-32 flex items-center justify-center rounded-sm text-sky-400 bg-cyan-950 hover:text-sky-300 hover:bg-blue-950 border border-sky-800 hover:border-cyan-500 font-courier xl:w-auto xl:inline-block cursor-default">
              保存する
            </button>
          </div>
        </form>
      </div>
    </>

  );
}

export const DeckEdit = ({ deck, updateDeckInfo, deleteDeck, setIsDeckEditWindowOpen }) => {
  const { register ,
          handleSubmit,
          formState:{errors},
          reset } = useForm({ mode: "onChange" })

  useEffect(() => {
    setupCSRFToken()
  }, [])

  useEffect(() => {
    if (deck) {
      reset({
        name: deck.name,
        category: deck.category,
        language: deck.language,
        cards: deck.cards
      });
    }
  }, [deck, reset]);

  const onSubmit = async (data) => {
    const { cards, ...updateData } = data
    await updateDeckInfo(deck.id, updateData)
  }

  return(
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 p-3">
            <label htmlFor="name" className="col-start-1 col-span-2 flex items-center justify-items-center text-cyan-200">デッキ名</label>
              <input
                {...register("name", {required: "デッキ名は必須です" })}
                id="name"
                name="name"
                type="text"
                className="px-4 col-start-3 col-span-9 w-full py-2 rounded bg-gray-800 focus:outline-none focus:ring border-gray-700 border-2 text-cyan-100"
              />
          </div>
          <div className="grid grid-cols-12 p-3">
            <label htmlFor="selectTag" className="col-start-1 col-span-2 flex items-center justify-items-center text-cyan-200">カテゴリ</label>
            <select
              {...register("category")}
              id="category"
              name="category"
              className="col-start-3 col-span-9 px-3 py-2 rounded bg-gray-800 focus:outline-none focus:ring border-gray-700 border-2 text-cyan-100"
            >
              <option value="">( 未選択 )</option>
              <option value="methodLearning">{CATEGORY["methodLearning"]}</option>
              <option value="algorithm">{CATEGORY["algorithm"]}</option>
              <option value="refactoring">{CATEGORY["refactoring"]}</option>
              <option value="tradeOff">{CATEGORY["tradeOff"]}</option>
            </select>
          </div>
          <div className="grid grid-cols-12 p-3">
            <label htmlFor="selectTag" className="col-start-1 col-span-2 flex items-center justify-items-center text-cyan-200">言語</label>
            <select
              {...register("language")}
              id="language"
              name="language"
              className="col-start-3 col-span-9 px-3 py-2 rounded bg-gray-800 focus:outline-none focus:ring border-gray-700 border-2 text-cyan-100"
            >
              <option value="">( 未選択 )</option>
              {Object.entries(LANGUAGE_LABELS).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-center py-3 text-red-400">
            <p>{errors.name? errors.name.message : <br/>}</p>
          </div>
          
          <div className="grid grid-cols-12 p-3">
            <button className="col-start-5 col-span-3 font-bold text-lg py-3 px-5 flex items-center justify-center rounded-sm text-sky-400 bg-cyan-950 hover:text-sky-300 hover:bg-blue-950 border border-sky-800 hover:border-cyan-500 font-courier xl:w-auto xl:inline-block cursor-default">
              更新する
            </button>
            <button type="button" className="col-start-11 col-span-1 min-w-11 font-bold text-lg p-3 rounded-md text-gray-400 bg-cyan-950 hover:text-red-500 hover:bg-blue-950 border border-red-800 hover:border-red-500 font-courier xl:w-auto xl:inline-block cursor-default px-1" 
                    onClick={() => deleteDeck(deck.id, () => {setIsDeckEditWindowOpen(false)})}>
              <div className="flex items-center justify-center">
                <FaTrashCan />
              </div>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}