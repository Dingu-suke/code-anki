import React, { useState } from "react";
import { SentenceAndAnswer } from "./SentenceAndAnswer";

export const CheckCard = ({ selectedCard }) => {
  const [activeOutput, setActiveOutput] = useState('user');
  const [outputHeight, setOutputHeight] = useState('130px');  // 初期高さを130pxに設定
  
  return (
    <div>
      <div className="min-h-screen p-4 flex flex-col bg-gray-950">      
        <div
          className="gap-4 mb-8"
        >
          <div className="col-span-6">
            <SentenceAndAnswer
              card={selectedCard}
            />
          </div>
        </div>
      </div>
    </div>
  );
};