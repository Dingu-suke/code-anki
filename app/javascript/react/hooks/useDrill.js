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
  const [status, setStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [filteredDrills, setFilteredDrills] = useState('')

  const fetchDrill = useCallback(async () => {
    setIsDrillLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/decks');
      setDrills(data);
    } catch (error) {
      setError('デッキの取得に失敗しました: ' + error.message);
      console.error('Error fetching drills:', error);
    } finally {
      setIsDrillLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDrill()
  }, [fetchDrill])

  useEffect(() => {
    const searchTerms = searchTerm.toLowerCase().split(' ');
    const filtered = drills 
      .filter(drill =>
        (searchTerms.every(term =>
          drill.name?.toLowerCase().includes(term)
        )) // ワード検索
        &&
        (selectedLanguage ? drill.language === selectedLanguage : true ) // 言語検索
        &&
        (selectedCategory ? drill.category === selectedCategory : true)  // カテゴリ検索
        &&
        drill.status === "public"
        
      )
      .sort((a, b) => a.name.localeCompare(b.name));
      setFilteredDrills(filtered);
  }, [drills, searchTerm, selectedLanguage, selectedCategory, status]);

  const setSearchTermAndFilter = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  return {
    drills, setDrills,
    isDrillLoading, setIsDrillLoading,
    error, setError,
    status, setStatus,
    searchTerm, setSearchTerm, setSearchTermAndFilter,
    selectedLanguage, setSelectedLanguage,
    selectedCategory, setSelectedCategory,
    filteredDrills, setFilteredDrills
  }
}