import { useEffect, useState } from "react"
import { getLabelKey } from "../components/runCodeEditorDaisyUI/constants"

export const useCards = (language) => {
  const [cards, setCards] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [searchCard, setSearchCard] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState(language)
  const [filteredCards, setFilteredCards] = useState([]);
  
  useEffect (() => {
    const fetchCards = async() => {
      setIsLoading(true)
      try {
        const response = await fetch('/your_cards'
          , {
          headers: {
            'Accept': 'application/json'
          }
        }
      )
        if (response.ok) {
          const data = await response.json()
          setCards(data)
          // console.log(`${data || "data is nill" } `)
        } else {
          console.log('server error')
        }
      } catch (error) {
        console.log('request error')
      } finally {
        setIsLoading(false)
      }
    }
    fetchCards()
  }, [])

  useEffect(() => {
    setSelectedLanguage(getLabelKey(language))
  }, [language])
  
  useEffect(() => {
    if (cards) {
      const searchCards = searchCard.toLowerCase().split(' ');
      const filtered = cards
        .filter(card =>
            (searchCards.every(term => 
              card.title .toLowerCase().includes(term) || 
              card.body  .toLowerCase().includes(term) ||
              card.answer.toLowerCase().includes(term) 
            ))
        &&
        (selectedLanguage ? card.language === selectedLanguage : true)) // 言語検索
        .sort((a, b) => a.title.localeCompare(b.title));
      setFilteredCards(filtered);
      }}, [cards, searchCard, selectedLanguage]);

  return { 
            cards, setCards,
            isLoading, setIsLoading,
            searchCard, setSearchCard,
            filteredCards, setFilteredCards,
            selectedLanguage }
}