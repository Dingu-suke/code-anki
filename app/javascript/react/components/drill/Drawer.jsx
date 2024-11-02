import React, { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const Drawer = ({ isOpen, onClose, onOpen, containerRef, drillName, children }) => {
  const drawerRef = useRef(null);
  const [drawerWidth, setDrawerWidth] = useState('800px');
  const previewWidth = '64px';  // ドロワープレビュー時の幅

  useEffect(() => {
    const updateDrawerWidth = () => {
      const element = containerRef?.current;

      try {
        const containerWidth = element.offsetWidth;
        if (typeof containerWidth === 'number') {  // 型チェック
          const newWidth = `${Math.round(containerWidth * 0.95)}px`;
          setDrawerWidth(newWidth);
        }
      } catch (error) {
        console.error("Error getting container width:", error);
      }
    };

    // コンポーネントのマウント後に実行
    const initialTimer = setTimeout(() => {
      updateDrawerWidth();
    }, 100); // より確実にするために少し待つ

    // ResizeObserver の設定
    let resizeObserver;
    try {
      resizeObserver = new ResizeObserver(() => {
        updateDrawerWidth();
      });

      const element = containerRef?.current;
      if (element) {
        resizeObserver.observe(element);
      }
    } catch (error) {
      console.error("ResizeObserver エラー:", error);
    }

    // クリーンアップする
    return () => {
      clearTimeout(initialTimer);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [containerRef, isOpen]);

  return (
    <>
      {/* オーバーレイ - ドロワーが開いているときのみ表示 */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black z-40"
        />
      )}

      {/* ドロワー */}
      <div className="fixed right-0 top-0 h-full flex z-50">
        {/* プレビュー */}
        <motion.div
          animate={{ width: isOpen ? 0 : previewWidth }}
          className={`h-full bg-slate-900 border-l border-cyan-700 
                    flex items-center justify-center cursor-pointer
                    transition-colors hover:bg-slate-800
                    ${isOpen ? 'opacity-0' : 'opacity-100'}`}
          onClick={() => !isOpen && onOpen()}
        >
          <div className="text-cyan-400 rotate-90">
          <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#bad1d1"><path d="M480-200 240-440l46.67-46.67 193.33 193 193.33-193L720-440 480-200Zm0-248.67-240-240 46.67-46.66 193.33 193 193.33-193L720-688.67l-240 240Z"/></svg>
          </div>
        </motion.div>

        {/* メインのドロワー */}
        <motion.div
          animate={{ 
            width: isOpen ? drawerWidth : 0
          }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="h-full bg-slate-950 border-l border-cyan-700 overflow-hidden"
        >
          <div className="relative h-full">
            {/* ヘッダー */}
            <div className="absolute top-0 left-0 right-0 h-16 px-6 
                            border-b border-cyan-700 bg-slate-900 
                            flex items-center justify-between">
              <h2 className="text-xl font-bold text-cyan-400 truncate">
                {drillName}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-800 transition-colors"
              >
                <span className="text-cyan-400">✕</span>
              </button>
            </div>

            {/* コンテンツ */}
            <div className="h-full pt-16 overflow-y-auto">
              <div className="p-2">
                {children}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};