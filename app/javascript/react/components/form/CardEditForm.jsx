import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Answer, Remarks } from '../card/AnswerCard';
import QuestionCard from '../card/QuiestionCard';
import { setupCSRFToken } from './setupCSRFToken';
import { FaTrashCan } from "react-icons/fa6";
import { Toast, useToast } from '../toast/Toust';

export const CardEditForm = ({useInWindow, selectedCard, setSelectedCard, onUpdateSuccess, windowWidth, setIsEditWindowOpen, setCards, showToast}) => {
  // -----
  const questionEditorRef = useRef(null);
  const remarksEditorRef = useRef(null);  
  
  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: selectedCard.title,
      body: selectedCard.body,
      answer: selectedCard.answer,
      remarks: selectedCard.remarks,
      language: selectedCard.language
    }
  });

  useEffect(() => {
    if (selectedCard) {
      setValue('title', selectedCard.title);
      setValue('body', selectedCard.body);
      setValue('answer', selectedCard.answer);
      setValue('remarks', selectedCard.remarks);
      setValue('language', selectedCard.language);
    }
  }, [selectedCard, setValue]);
  
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

  useEffect ((selectedCard) => {
    if (selectedCard) {
      if (questionEditorRef.current) {
        questionEditorRef.current.value(selectedCard.body);
      }
      if (remarksEditorRef.current) {
        remarksEditorRef.current.value(selectedCard.remarks)
      }
    }
  }, [selectedCard])

  const handleQuestionBlur = useCallback((value) => {
    setValue('body', value);    
  }, [setValue]);
  
  const handleRemarksBlur = useCallback((value) => {
    setValue('remarks', value);
  }, [setValue]);
  
  const onSubmit = useCallback(async (data) => {
    try {
      const formData = {
        ...data,
        language: watch('language') // 明示的に言語を追加 
      };
    let res;
      if (selectedCard) {
        let res = await axios.patch(`/cards/${selectedCard.id}`, { card: formData });
        showToast('カードを更新しました', 'success')
        onUpdateSuccess(res.data.card)
      } else {
        res = await axios.post('/cards', { card: formData });
        showToast('カードを作成しました', 'success')      
      }
    } catch(error) {
      showToast(`エラーが発生しました ${error.response?.data}`, 'error')
    }
  }, [selectedCard, watch, onUpdateSuccess]);

  const deleteCard = async (cardId) => {
    setupCSRFToken();
    try {
      const response = await axios.delete(`/destroy_your_card/${cardId}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 204) {   
        // まずトーストを表示
        showToast('カードを削除しました', 'success');
        
        // わずかな遅延後に状態を更新
        setTimeout(() => {
          setCards(prevCards => prevCards.filter(card => card.id !== cardId));
          setIsEditWindowOpen(false);
        }, 100);
      }
    } catch (error) {
      showToast(`カードの削除に失敗しました: ${error.message}`, 'error');
      console.error('カード削除失敗', error);
    }
  };

  const buttonText = useInWindow ? "カードを更新する" : "カードを保存する";
  const buttonTextLocation = () => {
    if (!useInWindow) {
      return (
        <button
        type="submit"
        className="btn text-sky-400 bg-cyan-950 hover:text-sky-300 hover:bg-blue-950 border border-sky-800 hover:border-cyan-500 font-courier xl:w-auto hidden xl:inline-block w-max-96">
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
    : "btn text-sky-400 bg-cyan-950 hover:text-sky-300 hover:bg-blue-950 border border-sky-800 hover:border-cyan-500 font-courier xl:w-auto hidden xl:inline-block w-min-96";

  const bottomButtonClasses = useInWindow
    ? "btn text-sky-400 bg-cyan-950 hover:text-sky-300 hover:bg-blue-950 border border-sky-800 hover:border-cyan-500 font-courier w-min-96"
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
            <div className="pb-5 grid grid-cols-12">
              <input
                type="text"
                placeholder='タイトル'
                id="title"
                {...register("title")}
                className='col-start-1 col-span-6 bg-gray-700 text-green-100 text-2xl font-courier px-6 py-2 focus:outline-none focus:border-2 focus:border-blue-800 border border-blue-900 mb-4 sm:mb-0'
              />
              <button type="button" className="col-start-11 col-span-1 font-bold text-lg min-w-12 max-w-12 p-3 rounded-md text-gray-400 bg-cyan-950 hover:text-red-500 hover:bg-blue-950 border border-red-800 hover:border-red-500 font-courier xl:w-auto xl:inline-block cursor-default px-1" 
                    onClick={() => deleteCard(selectedCard.id)}>
              <div className="flex items-center justify-center">
                <FaTrashCan />
              </div>
            </button>
              <div>
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
                  defaultValue={selectedCard.body}
                  onBlur={handleQuestionBlur}
                  remarksEditorRef={remarksEditorRef}
                  remarksDefaultValue={selectedCard.remarks}
                  remarksOnBlur={handleRemarksBlur}
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
                      selectedCard={selectedCard}
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
