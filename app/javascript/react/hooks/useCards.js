import { useEffect, useState } from "react"

export const useCards = () => {
  const [cards, setCards] = useState()
  const [isLoading, setIsLoading] = useState(false)

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
  return { cards, setCards, isLoading, setIsLoading }
}