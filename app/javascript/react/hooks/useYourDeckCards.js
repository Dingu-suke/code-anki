import { useEffect, useState } from "react"

export const useYourDecks = () => {
  const [decks, setDecks] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect (() => {
    const fetchDecks = async() => {
      setIsLoading(true)
      try {
        const response = await fetch(`/your_decks`
          , {
          headers: {
            'Accept': 'application/json'
          }
        }
      )
        if (response.ok) {
          const data = await response.json()
          setDecks(data)
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
    fetchDecks()
  }, [])
  return { decks, setDecks, isLoading, setIsLoading }
}