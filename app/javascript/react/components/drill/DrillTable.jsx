import React from 'react';
import { CATEGORY, LanguageIcon } from '../runCodeEditorDaisyUI/constants';

const editButtonCell = "py-2 w-10 truncate text-center"
const drillTitleCell = "px-4 py-3 min-w-64 truncate text-start"
const cardsLengthCell = "px-2 py-3 min-w-20 max-w-28 truncate text-center"
const deckLanguageCell = "pl-4 pr-2 py-3 min-w-20 max-w-28 truncate text-center"
const drillCategoryCell = "px-4 py-3 min-w-32 max-w-40 truncate"
const drillUpadateDateCell = "px-4 py-3 min-w-20 max-w-28 truncate text-center"

const methodLearningColor = "bg-yellow-950 text-amber-200 bg-opacity-55"
const algorithmColor = "bg-green-950 text-emerald-200"
const refactoringColor = "bg-blue-950 text-cyan-200"
const tradeOffColor = "bg-fuchsia-950 text-pink-200 bg-opacity-60"



export const DrillTable = ({filteredDrills, selectedDrill, isDrillLoading, handleSelectDrill}) => {

  if (isDrillLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="text-white loading loading-ring loading-lg"></div>
      </div>
    );
  }
  return (
    <div className="overflow-y-auto max-h-[500px] min-h-[750px] w-11/12 border border-cyan-900 rounded-md"> {/* スクロール可能な高さを設定 */}
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs uppercase bg-gray-700 text-gray-300 sticky top-0 z-10"> {/* stickyヘッダーの設定 */}
            <tr className=''>
              <th scope="col" className={`${editButtonCell}`}></th>
              <th scope="col" className={`${drillTitleCell}`}>デッキ名</th>
              <th scope="col" className={`${cardsLengthCell}`}>カード数</th>
              <th scope="col" className={`${deckLanguageCell}`}>言語</th>
              <th scope="col" className={`${drillCategoryCell}`}>カテゴリ</th>
              <th scope="col" className={`${drillUpadateDateCell}`}>最終更新日</th>
            </tr>
          </thead>
          <tbody>
              {/* <div className="text-center py-4">デッキがありません</div> */}            
            {filteredDrills?.length > 0
            ? (
              <>              
                {filteredDrills.map((drill) => (
                  <tr
                    key={drill.id}
                    className={`border-b border-gray-700 
                              ${selectedDrill?.id === drill.id ? "bg-cyan-900 hover:bg-cyan-800" :"bg-gray-800 hover:bg-gray-700"}`
                  }
                    onClick={() => {handleSelectDrill(drill)}}
                  >
                    <td scope="row"
                        className="font-medium whitespace-nowrap text-gray-400 min-w-4 js-edit-icon hover:text-red-400"
                        onClick={(event) => {
                                          event.stopPropagation();
                                          handleEditDeck(drill)
                                        }}
                      >
                    </td>
                    <td scope="row" className={`${drillTitleCell} ml-3 font-medium whitespace-nowrap text-cyan-400`}>
                      {drill.name}
                    </td>
                    <td className={`${cardsLengthCell}`}>
                      <div className="flex justify-center items-center">
                        <div className={`
                          text-sm font-medium rounded min-w-8 text-center
                          ${drill.cards?.length > 2
                            ? "border border-lime-900 bg-sky-950 text-green-400"
                            : "bg-red-950 text-pink-400 border border-red-900" }`
                          }>
                          {drill.cards ? drill.cards.length : 0}
                        </div>
                      </div>
                    </td>
                    <td className={`${deckLanguageCell}`}>
                      <div className="flex items-center justify-center">
                        {drill.language ? <LanguageIcon language={drill.language} /> : ""}
                      </div>
                    </td>
                    <td className={`${drillCategoryCell} flex justify-start`}>
                      <div>
                        {drill.category
                        ? 
                        <div className={`inline-block text-xs font-medium rounded truncate px-2
                            ${drill.category === "methodLearning" && methodLearningColor}
                            ${drill.category === "algorithm" && algorithmColor}
                            ${drill.category === "refactoring" && refactoringColor}
                            ${drill.category === "tradeOff" && tradeOffColor}
                            `
                            }>
                            <div className='py-1'>
                              {CATEGORY[`${drill.category}`]}
                            </div>
                          </div> 
                        :
                          <span className="text-blue-100 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"></span>
                        }
                      </div>
                    </td>
                    <td className={`${drillUpadateDateCell}`}>
                      {new Date(drill.updated_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </>
              )
            : (
                <>
                  
                </>
              )}
          </tbody>
        </table>
      </div>
  )
}