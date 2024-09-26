import React from 'react';
import { useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion';

export const TripleStateToggle = () => {
  const [positionState, setPositionState] = useState("left");
  const prevpositionStateRef = useRef(null);
  const [position, setPosition] = useState(3);
  
  const getpositionStateAndPosition = () => {
    const scale = 0.75
    switch (positionState) {
      // left の位置にあるならば center にする
      case "left":
        console.log(positionState)
        setPositionState("center")
        setPosition(3)
        prevpositionStateRef.current = "left"
        break
      // center の位置にあるならば left か right にする
      case "center":
        if (prevpositionStateRef.current === "left") {
          console.log(positionState)
          setPositionState("right")
          setPosition(6)
        }
        else if (prevpositionStateRef.current === "right") {
          console.log(positionState)
          setPositionState("left")
          setPosition(0)
        }               
        prevpositionStateRef.current = "center"
        break
      // right の位置にあるならば center にする
      case "right":
      console.log(positionState)
      setPositionState("center")
      setPosition(3)
      prevpositionStateRef.current = "right"
      break
    }
  }
  return (
    
    <div
        className="relative js-toggle-button"
        onClick={getpositionStateAndPosition}
    >
      <div className="text-cyan-400">        
      </div>
      <svg 
        className="absolute top-0 left-0" 
        width="60"
        height="34"
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
          fill={
            positionState === "left"
              ? "lightgreen"
              : positionState === "center"
                ? "#d3d3d3"
                : positionState === "right"
                  ? "#f08080"
                  : ""
          }
          stroke="#7F7F7F"
          strokeWidth="0.1"
        />
      </svg>
      <motion.svg
        className="absolute top-0.5"
        initial={{ x: 0 }}
        animate={{ x: position * 4.2}}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        width="34" height="31" 
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
            stroke="#a9a9a9"
            strokeWidth="0.1"
          />
        </g>
      </motion.svg>
    </div>
  );
};

export const Toggle = () => {
  const [toggleState, setToggleState] = useState(false);  
  const [togglePosition, setTogglePosition] = useState(22)
  
  const switchToggle = () => {
    setToggleState(!toggleState);
  }
  useEffect(() => {
    toggleState === true ? setTogglePosition(2) : setTogglePosition(22)
  }, [toggleState])

  return (
    <div
        className="relative js-toggle-button"
        onClick={(event)=> {
          event.stopPropagation();
          switchToggle(event)
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
          fill={`${ toggleState === true ? "#00ff00" : "gray" }`}
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