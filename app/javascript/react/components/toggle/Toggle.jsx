import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { setupCSRFToken } from '../form/setupCSRFToken';

export const Toggle = ({initialStatus, deck, showToast}) => {
  const [status, setStatus] = useState(initialStatus || "private");  
  const [togglePosition, setTogglePosition] = useState(22)

  useEffect(() => {
    status === "public" ? setTogglePosition(2) : setTogglePosition(22)
  }, [status])


  const handleToggle = async () => {
    if (deck.cards.length < 2) {
      // トースト追加したい
      showToast("カードが3枚以上のデッキのみ公開できます")
      return
    }
    const newStatus = status === "public" ? "private" : "public"
    setStatus(newStatus);
    setupCSRFToken()
    try {
      await axios.patch(`decks/${deck.id}`, {
        deck: { status: newStatus }
      });
      if (newStatus === "public"){
        showToast("カードを公開しました")
      } else {
        showToast("カードを非公開にしました")
      }
    } catch (error) {
      console.error('Error updating status:', error)
      setStatus(status)
    }
  };

  return (
    <div
        className="relative js-toggle-button"
        onClick={(event)=> {
          event.stopPropagation();
          // switchToggle()
          handleToggle()
        }}
    >
      <div className="text-cyan-400">        
      </div>
      <svg 
        className="absolutew-full h-full origin-top-left" 
        width="48"
        height="27"
        viewBox="0 0 14 8"
      >
        <path
          d=" M 4 0 
              C 2 0 0 2 0 4
              C 0 6 2 8 4 8
              L 10 8
              C 12 8 14 6 14 4
              C 14 2 12 0 10 0
              L 4 0"
          fill={`${ status === "public" ? "#00ff00" : "gray" }`}
          stroke="black"
          strokeWidth="0.1"
        />
      </svg>
      <motion.svg
        className="absolute top-0.5"
        initial={{ x: 0}}
        animate={{ x: togglePosition }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        width="24" height="24" 
        viewBox="0 0 7.8 8.2"
      >
        <g>
          <path
            d=" M 4 0
                C 2 0 0 2 0 4
                C 0 6 2 8 4 8
                C 6 8 8 6 8 4
                C 8 2 6 0 4 0"
            fill="#F3F2F3"
            stroke="black"
            strokeWidth="0.1"
          />
        </g>
      </motion.svg>
    </div>
  );
}