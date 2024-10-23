import { useCallback, useEffect, useState } from "react"
import axios from 'axios'

const api = axios.create({
  baseURL: '/',  // ルートURLから始まるようにします
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export const useDrill = () => {

  const [drills, setDrills] = useState([])
  const [isDrillLoading, setIsDrillLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchDrill = useCallback(async () => {
    setIsDrillLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/decks');
      setDrills(data);
      // setFilteredDecks(data);
    } catch (error) {
      setError('デッキの取得に失敗しました: ' + error.message);
      console.error('Error fetching decks:', error);
    } finally {
      setIsDrillLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDrill()
  }, [fetchDrill])

  return {
    drills, setDrills,
    isDrillLoading, setIsDrillLoading,
    error, setError
  }
}