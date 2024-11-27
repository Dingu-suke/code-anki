import React, { useEffect, useRef, useState } from 'react';
import { useYourDeckList } from '../../hooks/useYourDeckList';
import { Drawer } from '../drill/Drawer';
import { DrillShow } from '../drill/DrillShow';
import { DrillTable } from '../drill/DrillTable';
import { LanguageSelector } from '../runCodeEditorDaisyUI/LanguageController';
import { CATEGORY, getLabelKey, LANGUAGE_LABELS } from '../runCodeEditorDaisyUI/constants';


export const MyDrill = () => {
  const [selectedDrill, setSelectedDrill] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const containerRef = useRef(null); 

  const {
    decks, setDecks,
    filteredDecks: filteredDrills, setFilteredDecks,
    isDeckLoading: isDrillLoading , setIsDeckLoading: setIsDrillLoading,
    searchTerm, setSearchTerm,
    error, setError
    ,
    setSearchTermAndFilter,
    setSelectedLanguage,
    setSelectedCategory,
    setStatus,
    reRenderDeckList,    
    updateDeckAndCard
    
  } = useYourDeckList('/mypage')

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
            dispalayName={selectedDrill?.name}
          >
          <DrillShow selectedDrill={selectedDrill} />
        </Drawer>
        </div>
      </>
    )
  }