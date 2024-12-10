import React from 'react';

const XShareButton = () => {
  const shareUrl = "https://code-anki.com/decks";
  const shareText = `学習デッキを公開しました \n #code_anki \n #プログラミング学習 \n`;

  const handleShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center justify-center w-40 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200"
    >
      <div className="flex items-center space-x-2">
        <span className="text-lg text-gray-400 pr-4">Share</span>
        <span className="text-lg text-gray-400 pr-4">on</span>
        <svg
          className="flex-shrink-0 w-6 h-6" // 固定サイズを明示的に指定
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
    </button>
  );
}

export default XShareButton;