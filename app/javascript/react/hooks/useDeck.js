import { useEffect, useState } from "react"
import axios from 'axios'

export const useDeck = () => {
  const [decks, setDecks] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect (() => {
    const fetchDecks = async() => {
      setIsLoading(true)
      try {
        const response = await axios.get('/your_decks', {
          headers: {
            'Accept': 'application/json'
          }});
          setDecks(response.data);
          setError(null);
        } catch (err) {
          setError('Failed to fetch decks');
          console.error('Error fetching decks:', err);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchDecks();
    }, []);
  return { decks, setDecks, isLoading, setIsLoading }
}