import axios from 'axios';
import React, { useCallback, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Answer, Remarks } from '../card/AnswerCard';
import QuestionCard from '../card/QuiestionCard';
import { CODE_SNIPPETS } from '../runCodeEditorDaisyUI/constants';
import { setupCSRFToken } from './setupCSRFToken';

const CardForm = ({useInWindow, windowWidth, setFilteredCards, filteredCards}) => {
  // -----
  const questionEditorRef = useRef(null);
  const remarksEditorRef = useRef(null);
  console.log(useInWindow)

  
  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      body: '',
      answer: CODE_SNIPPETS['javascript'],
      remarks: '',
      language: `javascript`
    }
  });
  
  useEffect(() => {
    register('body');
    register('answer');
    register('remarks');
    register('language');
    register('title')
  }, [register]);
  
  useEffect(() => {
    setupCSRFToken();
  }, []);
  
  const handleQuestionBlur = useCallback((value) => {
    setValue('body', value);    
  }, [setValue]);
  
  const handleRemarksBlur = useCallback((value) => {
    setValue('remarks', value);
  }, [setValue]);
  
  const onSubmit = useCallback(async (data) => {
    try {
      // 言語選択
      const formData = {
        ...data,
        language: watch('language')
      };
      console.log("data", data)
      const res = await axios.post('/cards', { card: formData });
      // ✨️
      console.log('サーバーレスポンス:', res.data);
      const newCard = res.data
      console.log("newCard", newCard)
      setFilteredCards(prevCards => [...prevCards, newCard])
      // ✨️

      console.log('カードが作成されました', res.data);
    } catch(error) {
      console.error('エラーが発生しました', error.response?.data);
    }
  }, [watch]);
  
  const buttonText = "カードを保存する";
  const buttonTextLocation = () => {
    if (!useInWindow) {
      return (
        <button
        type="submit"
        className="btn text-sky-400 bg-cyan-950 hover:text-sky-300 hover:bg-blue-950 border border-sky-800 hover:border-cyan-500 font-courier w-full xl:w-auto hidden xl:inline-block">
          カードを保存する
      </button>
      )
    } else {
      <button 
        type="submit" className="btn text-sky-400 bg-cyan-950 hover:text-sky-300 hover:bg-blue-950 border border-sky-800 hover:border-cyan-500 font-courier w-1/2 xl:hidden">{buttonText}</button>
    }
  }
  
  const topButtonClasses = useInWindow
    ? "hidden" // useInWindowがtrueの場合、上部のボタンを非表示
    : "btn text-sky-400 bg-cyan-950 hover:text-sky-300 hover:bg-blue-950 border border-sky-800 hover:border-cyan-500 font-courier w-full xl:w-auto hidden xl:inline-block";

  const bottomButtonClasses = useInWindow
    ? "btn text-sky-400 bg-cyan-950 hover:text-sky-300 hover:bg-blue-950 border border-sky-800 hover:border-cyan-500 font-courier w-full"
    : "btn text-sky-400 bg-cyan-950 hover:text-sky-300 hover:bg-blue-950 border border-sky-800 hover:border-cyan-500 font-courier w-1/2 xl:hidden";

    const containerClasses = useInWindow
    ? `flex flex-col gap-4 h-full ${windowWidth && windowWidth < 1191 ? '' : 'grid grid-cols-2'}`
    : "flex flex-col xl:grid xl:grid-cols-2 xl:grid-rows-[2fr_1fr] gap-4 xl:h-[calc(100vh-200px)]";

  const questionClasses = useInWindow && windowWidth && windowWidth < 1191
    ? "flex-grow"
    : "col-start-1 col-end-2";

  const answerClasses = useInWindow && windowWidth && windowWidth < 1191
    ? "flex-grow"
    : "col-start-2 col-end-3";

  const remarksClasses = useInWindow && windowWidth && windowWidth < 1191
    ? "flex-grow"
    : "col-start-1 col-end-2";
      
  return (
    <div className="card shadow-xl min-w-0 m-[30px] bg-gray-800">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
            <div className="pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <input
                type="text"
                placeholder='タイトル'
                id="title"
                {...register("title")}
                className='bg-gray-700 text-green-100 text-2xl font-courier px-6 py-2 w-full sm:w-1/2 focus:outline-none focus:border-2 focus:border-blue-800 border border-blue-900 mb-4 sm:mb-0'
              />
              <div >
              <button
                type="submit"
                className={topButtonClasses}>
                {buttonText}
              </button>
              </div>
            </div>
              <div className={containerClasses}>
                <div className={questionClasses}>
                  <QuestionCard
                    editorRef={questionEditorRef}
                    defaultValue=""
                    onBlur={handleQuestionBlur}
                  />
                </div>
                <div className={answerClasses}>
                  <Controller
                    name='answer'
                    control={control}
                    render={({ field }) => (
                      <Answer
                        value={field.value}
                        onChange={field.onChange}
                        language={watch('language')}
                        onLanguageChange={(lang) => {
                          setValue('language', lang)
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="pt-6 flex justify-center">
              <button type="submit" className={bottomButtonClasses}>{buttonText}</button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default CardForm;
