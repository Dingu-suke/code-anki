import React, { useState } from 'react';
import { LANGUAGE_VERSIONS } from "./contents";

const languages = Object.entries(LANGUAGE_VERSIONS);

const ACTIVE_COLOR = "blue.400"


const LanguageSelector = (props) => {
  const { language, onSelect } = props;
  
  const onSelectAndUnopen = (lang) => {
    onSelect(lang)
    setIsOpen(false)
  }

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div  ml={2} mb={4}>
      <div mb={2} fontSize="lg">
        Language:
      </div >
        <div className="dropdown"
        >
          
          <div tabIndex={0} role="button" className="btn m-1">{language}</div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            {languages.map(([lang, version]) => (
              <li
              key={lang}              
                onClick={() => onSelectAndUnopen(lang)}
                >
                {lang}
                &nbsp;
                <div as="span" color="gray.600" fontSize="sm">
                  {version}
                </div>
              </li>
            ))}
          </ul>
      </div>
    </div>
  );
};

export default LanguageSelector;
