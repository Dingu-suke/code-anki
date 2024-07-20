import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';

import { CODE_SNIPPETS } from '../RunCodeEditorDaisyUI/constants';
import { Answer, Remarks } from '../card/AnswerCard';
import QuestionCard from '../card/QuiestionCard';

const CardForm = () => {
  // -----
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

  const questionEditorRef = useRef(null);
  const remarksEditorRef = useRef(null);

  const handleQuestionBlur = useCallback((value) => {
    setValue('body', value);    
  }, [setValue]);

  const handleRemarksBlur = useCallback((value) => {
    setValue('remarks', value);
  }, [setValue]);

  // const onSubmit = async (data) => {
  //   // try {
  //   //   const response = await axios.post('/cards', { card: data });
  //   //   console.log(response.data);
  //   // } catch (error) {
  //   //   console.error(error);
  //   // }
  //   console.log(data)
  // };


  const onSubmit = useCallback((data) => {
    // フォーム送信時に最新の値を取得
    const updatedData = {
      ...data,
      body: questionEditorRef.current?.getValue() || ''
    };
    console.log(data)
    // console.log(availableLanguages()); 
  }, []);

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
              <button
                type="submit"
                className="btn text-sky-400 bg-cyan-950 hover:text-sky-300 hover:bg-blue-950 border border-sky-800 hover:border-cyan-500 font-courier w-full xl:w-auto hidden xl:inline-block">
                カードを保存する
              </button>
            </div>
              {/* <div className="flex flex-col xl:grid xl:grid-cols-2 xl:grid-rows-2 gap-4"> */}
              <div className="flex flex-col xl:grid xl:grid-cols-2 xl:grid-rows-[2fr_1fr] gap-4 xl:h-[calc(100vh-200px)]">
                <div className='row-start-1 row-end-2 col-start-1 col-end-2'>
                  <QuestionCard
                    editorRef={questionEditorRef}
                    defaultValue=""
                    onBlur={handleQuestionBlur}
                  />
                </div>
                <div className='row-start-1 row-end-3 col-start-2 col-end-3'>
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
                    )} />
                </div>
                <div className='row-start-2 row-end-3 col-start-1 col-end-2'>
                  <Remarks
                  editorRef={remarksEditorRef}
                  defalultValue=""
                  onBlur={handleRemarksBlur}
                  />
                </div>
                  
              </div>
            </div>
            <div className="pt-6 flex justify-center">
              <button type="submit" className="btn text-sky-400 bg-cyan-950 hover:text-sky-300 hover:bg-blue-950 border border-sky-800 hover:border-cyan-500 font-courier w-1/2 xl:hidden">カードを保存する</button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default CardForm;
