import React from 'react';

export const CodeAnkiLogo = () => {
  return (
    <>
    <svg viewBox="0 0 400 170" xmlns="http://www.w3.org/2000/svg">
  {/* 暗い背景 */}
  <rect width="400" height="200" fill="##FFCB05"/>
  
  {/* コード風の装飾的な要素 */}
  <text x="20" y="30" fill="#6A9955" fontFamily="monospace" fontSize="20">
    // Programming Learning Platform
  </text>
  
  <text x="20" y="50" fill="#569CD6" fontFamily="monospace" fontSize="20">
    const app &#123;
  </text>
  
  <text x="20" y="158" fill="#569CD6" fontFamily="monospace" fontSize="20">
    &#125;;
  </text>
  
  {/* メインのロゴテキスト - サイズを68に微調整 */}
  <text x="190" y="60%" fontFamily="monospace" fontSize="66" fill="#61DAFB" 
        textAnchor="middle" dominantBaseline="middle" fontWeight="bold">
    code-anki
  </text>
  
  {/* アクセント装飾 */}
  <rect x="40" y="132" width="340" height="2" fill="#61DAFB" opacity="0.3"/>
  
  {/* カーソル点滅のような装飾 - 位置を右に調整 */}
  <rect x="370" y="60" width="5" height="66" fill="#FFCB05">
    <animate attributeName="opacity" 
              values="0;1;0" 
              dur="1s" 
              keyTimes="0;0.5;1"
              repeatCount="indefinite"/>
  </rect>
</svg>
    </>
  );
};