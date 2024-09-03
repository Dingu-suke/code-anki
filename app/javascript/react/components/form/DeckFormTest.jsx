import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { LANGUAGE_LABELS } from '../RunCodeEditorDaisyUI/constants';
import { setupCSRFToken } from './setupCSRFToken';
import { useYourDeckList } from '../../hooks/useYourDeckList';

const errors = {
  deck : "デッキ名は必須です"
}

export const DeckNew = ({ addDeck }) => {
  const { register, handleSubmit, formState: {errors} } = useForm({mode: "onChange"})  

  useEffect(() => {
    setupCSRFToken();
  }, []);

  return(
    <>
      <div>
        <form onSubmit={handleSubmit(addDeck)}>
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
              <option value="methodLearning">メソッド学習</option>
              <option value="algorithm">アルゴリズム</option>
              <option value="refactoring">リファクタリング</option>
              <option value="tradeOff">トレードオフ</option>
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
            <button type="btn btn-primary submit" className="font-bold text-lg py-3 px-5 w-32 flex items-center justify-center rounded-sm text-sky-400 bg-cyan-950 hover:text-sky-300 hover:bg-blue-950 border border-sky-800 hover:border-cyan-500 font-courier xl:w-auto xl:inline-block cursor-default">
              保存する
            </button>
          </div>
        </form>
      </div>
    </>

  );
}

export const DeckEdit = () => {

}