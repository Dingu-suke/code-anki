import React, { useState } from 'react';
import Window from './Window';

const App = () => {
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const openWindow = () => setIsWindowOpen(true);
  const closeWindow = () => setIsWindowOpen(false);

  return (
    <div className="relative h-screen bg-gray-100 p-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={openWindow}
      >
        ウィンドウを開く
      </button>

      {isWindowOpen && (
        <Window
          title="Example Window"
          initialPosition={{ x: 300, y: 60 }}
          initialSize={{ width: 500, height: 800 }}
          onClose={closeWindow}
        >
          <h2 className="text-xl font-bold mb-2">ウィンドウの内容</h2>
          <p>これはドラッグ可能でサイズ変更可能なウィンドウコンポーネントです。</p>
          <p className="mt-2">×ボタンをクリックして閉じることができます。</p>
        </Window>
      )}
    </div>
  );
};

export default App;