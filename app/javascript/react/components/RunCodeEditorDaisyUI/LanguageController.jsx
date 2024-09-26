import React, { useEffect, useRef, useState } from 'react';
import { getLabelKey, LANGUAGE_LABELS, LANGUAGE_LOGO, LANGUAGE_VERSIONS, LanguageIcon } from "./constants";

const languages = Object.entries(LANGUAGE_VERSIONS);

export const LanguageLabel = ({ language }) => {
  
  return (
    <div className="mr-2">
      <div>
        <button tabIndex={0} role="button" className="btn w-28 min-h-0 h-7 mx-3 border-purple-700 text-slate-200 bg-slate-800 font-courier hover:bg-slate-800 hover:border-purple-700 cursor-auto">{language}</button>
      </div>
    </div>
  );
};

export const LanguageSelector = ({ language, onSelect }) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const         buttonRef   = useRef  (null);
  const         dropdownRef = useRef  (null);
  const         timeoutRef  = useRef  (null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = (event) => {
    const relatedTarget = event.relatedTarget;
    if (!buttonRef.current || !dropdownRef.current) return;
    if (
      !buttonRef.current.contains(relatedTarget) &&
      !dropdownRef.current.contains(relatedTarget)
    ) {
      timeoutRef.current = setTimeout(() => setIsOpen(false), 100);
    }
  };

  const onSelectAndClose = (lang) => {
    onSelect(lang);
    setIsOpen(false);
    console.log("onSelectAndClose", lang)
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div>
      <div className="dropdown dropdown-hover relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          
      >
        <button ref={buttonRef} type="button" role="button" className="size-14 min-h-0 rounded border border-blue-500 rounded:lg text-slate-200 bg-slate-950 font-courier hover:bg-indigo-950 hover:border-blue-500 cursor-default">
          <div className="flex itemsenter justify-center">
            <LanguageIcon language={getLabelKey(language)} size={35}/>  {/* 値からキーを取得する */}
          </div>
        </button>
          {isOpen && (
            <div 
            ref={dropdownRef}
            className="absolute top-full left-0 pt-2 w-full cursor-default"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} 
            >
              <ul tabIndex={0} className="dropdown-content menu rounded-box z-[1] w-64 shadow border border-indigo-300 bg-gray-900" 
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
              >
                {languages.map(([lang, version]) => (
                  <li
                    key={lang}
                    onClick={() => onSelectAndClose(lang)}
                  >
                    <div className={`flex items-center justify-start
                      border-indigo-900 text-sky-500 hover:bg-sky-950 hover:text-cyan-300 font-courier
                      ${ lang === language 
                        ? 'bg-sky-950 text-green-400'
                        : ''}`}
                      >
                      <div>{LANGUAGE_LOGO[lang]}</div>
                      <div className="flex flex-col items-start justify-center pl-2">
                        {LANGUAGE_LABELS[lang]}
                        <div className="text-gray-400 text-sm border-indigo-900">
                          {version}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    </div>
  );
};