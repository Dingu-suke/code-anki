import React, { useEffect, useRef, useState } from 'react';
import { useDrill } from '../../hooks/useDrill';
import { CATEGORY, getLabelKey, LANGUAGE_LABELS, LanguageIcon } from '../runCodeEditorDaisyUI/constants';
import { LanguageSelector } from '../runCodeEditorDaisyUI/LanguageController';
import { DrillTable } from './DrillTable';
import { Drawer } from './Drawer';
import { DrillShow } from './DrillShow';

const borderCalss = "border-cyan-700 text-cyan-400 text-bold"
const tabClass = "px-4 border-t border-x rounded-t-sm font-bold focus:outline-none relative";
const activeTabClass = `bg-slate-950 ${borderCalss} border-b-0 after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[1px] after:bg-slate-950`;
const inactiveTabClass = "bg-slate-900 text-sky-600 border-transparent hover:text-cyan-500";

export const DrillIndex = () => {
  const [selectedDrill, setSelectedDrill] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const containerRef = useRef(null); 

  const handleSelectDrill = (drill) => {
    setSelectedDrill(drill);
    setIsDrawerOpen(true);  // ドロワーを開く
  };

  const openDrawer = () => {
    if (selectedDrill) {
      setIsDrawerOpen(true);
    }
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const {
    drills, setDrills,
    isDrillLoading, setIsDrillLoading,
    error, setError,
    status, setStatus,
    searchTerm, setSearchTerm, setSearchTermAndFilter,
    selectedLanguage, setSelectedLanguage,
    selectedCategory, setSelectedCategory,
    filteredDrills, setFilteredDrills
  } = useDrill()

  const [language, setLanguage] = useState("");

  const onSelect = (newLanguage) => {    
    // 🍉
    setLanguage(LANGUAGE_LABELS[newLanguage]);
  }

  useEffect(() => {
    // 🍉
    setSelectedLanguage(getLabelKey(language));
  }, [language])

  return(
    <>
      <div className="shadow-lg rounded-md" ref={containerRef}>
        <div className="grid grid-cols-12 gap-4 mb-4">
          <input
            type="text"
            placeholder="デッキを検索"
            value={searchTerm}
            onChange={(e) => setSearchTermAndFilter(e.target.value)}
            className="col-span-4 p-2 pl-3 rounded bg-gray-700 border focus:outline-none focus:border-2 focus:border-blue-800 border-blue-900 text-cyan-100"
          />
          <div className="z-40 flex items-center justify-center">
            <LanguageSelector language={language} onSelect={onSelect} />
          </div>
          <select
            id="category"
            name="category"
            className="col-span-3 px-3 py-2 rounded bg-gray-800 focus:outline-none focus:ring border-gray-700 border-2 text-cyan-100 truncate"
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
          <option value="">すべて</option>
          {Object.entries(CATEGORY).map(([key, string]) => 
            (
              <option key={key} value={`${key}`}>{string}</option>
            ))}
          </select>
        </div>
        <DrillTable filteredDrills={filteredDrills} selectedDrill={selectedDrill} isDrillLoading={isDrillLoading} handleSelectDrill={handleSelectDrill} />
        <Drawer
          isOpen={isDrawerOpen} 
          onClose={handleCloseDrawer}
          onOpen={openDrawer}
          containerRef={containerRef}
          drillName={selectedDrill?.name}
        >
        <DrillShow selectedDrill={selectedDrill} />
      </Drawer>
      </div>
    </>
  )
}