import { useEffect, useState } from "react";

export const useYourCard = (cards, language) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState(language)
  const [filteredCards, setFilteredCards] = useState(cards)
  
  // カードを絞り込み検索
    useEffect(() => {
      const searchTerms = searchTerm.toLowerCase().split(' ');
      const filtered = cards
        .filter(card =>
          (searchTerms.every(term =>
            card.name?.toLowerCase().includes(term)
          )) // ワード検索
          &&
          (selectedLanguage ? card.language === selectedLanguage : true ) // 言語検索
        )
        .sort((a, b) => a.name.localeCompare(b.name));
      setFilteredCards(filtered);
    }, [searchTerm, selectedLanguage]);    
  
  return (
    searchTerm, setSearchTerm
  )
}