import React, { useState } from 'react';
import { activeTabClassGreen, borderCalss, inactiveTabClassGreen, tabClass } from '../../tabStylesAndFunc/styleClass';
import { MyDrill } from './MyDrill';

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
            className={`${tabClass} ${activeTab === 'myDrill' ? activeTabClassGreen : inactiveTabClassGreen} cursor-auto h-7 text-sm`}
            onClick={() => handleTabChange('myDrill')}
            aria-selected={activeTab === 'myDrill'}
            aria-controls="myDrill-panel"
            >
            マイデッキ
          </button>
        </div>
        <div className={`bg-slate-950 border-x border-b rounded-b-md ${borderCalss}`}>
          <div
            role="tabpanel"
            id="myDrill-panel"
            className={`${activeTab === 'myDrill' ? '' : 'hidden'} text-white`}
          >
            <div className="p-6">
              <MyDrill />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}