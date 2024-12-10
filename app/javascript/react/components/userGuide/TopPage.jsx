import React from 'react';
import { CodeAnkiLogo } from './image';
import { howToUse } from './howToUse';


export const TopPage = () => {

  return (
    <>
    <div className="">
      <div className="grid grid-cols-12 pb-8">
        <div className="col-start-3 col-span-8 border border-blue-600 rounded-md">
          <CodeAnkiLogo />
        </div>
      </div>
    </div>
    <div className="">
      <div className="border border-blue-700 bg-gray-950 text-white rounded-md p-6">
        <div className='text-[36px] text-cyan-200'>
          code-anki (β板) の 使い方
        </div><br/>
        <div className="flex flex-wrap">
          <div className='text-[30px]'>
            1. 学習カードを登録する
          </div><br/>
          <div className='text-[30px] text-cyan-700 pl-10'>
              ｢カード編集｣から作成/編集できます
          </div><br/>
        </div>
        <div className="flex flex-wrap">  
          <div className='text-[30px]'>
            2. 学習デッキに学習カードを編成する
          </div><br/>
          <div className='text-[30px] text-cyan-700 pl-10'>
            ｢デッキ編集｣から作成/編集できます
          </div><br/>
        </div>
        <div className="flex flex-wrap">
          <div className='text-[30px]'>
            3. デッキを解いて覚える
          </div><br/>
          <div className='text-[30px] text-cyan-700 pl-10'>
            ｢マイページ｣で自分の作成したデッキに取り組めます
          </div><br/>
          <br/><br/>
        </div>
        <div className='text-[30px]'>
        【その他】
        </div><br/>
        <div className="flex flex-wrap">
          <div className='text-[30px]'>
              カードが3枚以上のデッキは全体に公開できます
          </div><br/>
          <div className="text-[30px] text-cyan-700 pl-10">
            ｢みんなのデッキ｣から全体に公開されているデッキに取り組めます
          </div>          
        </div>
      </div>
    </div>
    </>
  )
}