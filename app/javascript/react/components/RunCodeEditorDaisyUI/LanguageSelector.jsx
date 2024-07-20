import React, { useEffect, useRef, useState } from 'react';
import { LANGUAGE_VERSIONS } from "./constants";

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }) => {
  
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
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="mr-2">
      <div className="dropdown dropdown-hover relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          
      >
        <button tabIndex={0} ref={buttonRef} type="button" role="button" className="btn w-28 min-h-0 h-7 mx-3 border-purple-700 text-slate-200 bg-slate-800 font-courier hover:bg-slate-800 hover:border-purple-700">{language}</button>
          {isOpen && (
            <div 
            ref={dropdownRef}
            className="absolute top-full left-0 pt-2 w-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} 
            >
              <ul tabIndex={0} className="dropdown-content menu rounded-box z-[1] w-52 shadow border border-indigo-300 bg-gray-900"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
              >
                {languages.map(([lang, version]) => (
                  <li
                    key={lang}
                    onClick={() => onSelectAndClose(lang)}
                  >
                    <a className={`border-indigo-900 text-sky-500 hover:bg-sky-950 hover:text-cyan-300 font-courier ${
                    lang === language ? 'bg-sky-950 text-cyan-400' : ''
                  }`}>
                    {lang}
                    <span className="text-gray-400 text-sm border-indigo-900">
                      {version}
                    </span>
                  </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    </div>
  );
};

export default LanguageSelector;