import React, { useState } from 'react';
import { MyDrill } from './MyDrill';

const borderCalss = "border-teal-700 text-emerald-400 text-bold"
const tabClass = "px-4 border-t border-x rounded-t-sm font-bold focus:outline-none relative";
const activeTabClass = `bg-slate-950 ${borderCalss} border-b-0 after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[1px] after:bg-slate-950`;
const inactiveTabClass = "bg-slate-900 text-emerald-700 border-transparent hover:text-green-600";

export const MyPage = () => {

  const [activeTab, setActiveTab] = useState('myDrill')

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return(
    <div>
      <div className="pl-2 pr-4 w-full">
        <div role="tablist" className={`flex border-b ${borderCalss}`}>
          <button
            role="tab"
            className={`${tabClass} ${activeTab === 'myDrill' ? activeTabClass : inactiveTabClass} cursor-auto h-7 text-sm`}
            onClick={() => handleTabChange('myDrill')}
            aria-selected={activeTab === 'myDrill'}
            aria-controls="myDrill-panel"
            >
            マイデッキ
          </button>
          <button
            role="tab"
            className={`${tabClass} ${activeTab === 'favorite' ? activeTabClass : inactiveTabClass} cursor-auto h-7 text-sm`}
            onClick={() => handleTabChange('favorite')}
            aria-selected={activeTab === 'favorite'}
            aria-controls="favorite-panel"
            >
            お気に入り
          </button>
          <button
            role="tab"
            className={`${tabClass} ${activeTab === 'ogher' ? activeTabClass : inactiveTabClass} cursor-auto h-7 text-sm`}
            onClick={() => handleTabChange('ogher')}
            aria-selected={activeTab === 'ogher'}
            aria-controls="ogher-panel"
            >
            その他
          </button>
        </div>
        <div className={`bg-slate-950 border-x border-b rounded-b-md ${borderCalss}`}>
          <div
            role="tabpanel"
            id="myDrill-panel"
            className={`${activeTab === 'myDrill' ? '' : 'hidden'} text-white`}
          >
            {/* ドリル選択 */}
            <div className="p-6">
              <MyDrill />
            </div>
          </div>
          <div
            role="tabpanel"
            id="favorite-panel"
            className={`p-6 ${activeTab === 'favorite' ? '' : 'hidden'} text-white`}
          >
            {/* カード選択 */}
          いいいいいい
          </div>
          <div
            role="tabpanel"
            id="ogher-panel"
            className={`px-6 pt-6 ${activeTab === 'ogher' ? '' : 'hidden'} text-white`}
          >
            {/* プレビュー */}
            ううううううう
          </div>
        </div>
      </div>
    </div>
  )
}