import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { setupCSRFToken } from '../components/Form/setupCSRFToken';

// axiosのインスタンスを作成し、共通の設定を適用
const api = axios.create({
  baseURL: '/',  // ルートURLから始まるようにします
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export const useYourDeckList = () => {
  const [decks, setDecks] = useState([]);
  const [filteredDecks, setFilteredDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [isDeckLoading, setIsDeckLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const fetchDecks = useCallback(async () => {
    setIsDeckLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/your_decks');
      setDecks(data);
      // setFilteredDecks(data);
    } catch (error) {
      setError('デッキの取得に失敗しました: ' + error.message);
      console.error('Error fetching decks:', error);
    } finally {
      setIsDeckLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDecks()
  }, [fetchDecks, ])

  const reRenderDeckList = useCallback(() => {
    fetchDecks()
  }, [fetchDecks, filteredDecks])

  useEffect(() => {
    const searchTerms = searchTerm.toLowerCase().split(' ');
    const filtered = decks
      .filter(deck =>
        searchTerms.every(term =>
          deck.name?.toLowerCase().includes(term)
        )
      )
      .sort((a, b) => a.name.localeCompare(b.name));
    setFilteredDecks(filtered);
  }, [decks, searchTerm]);

  // ---- newDeck から移植 ---
  const addDeck = useCallback(async (data) => {
    console.log('送信データ:', data);
    try {
      const response = await axios.post('/decks',
        { deck: data },
        { headers: {
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
        }
      });

      // console.log(response.data)

      const newDeck = response.data; // APIレスポンスがそのままデッキオブジェクト
    
      // 新しいデッキを既存のデッキリストに追加
      setDecks(prevDecks => [...prevDecks, newDeck]);

       // フィルタリングデッキリストに追加
      // setFilteredDecks(prevFiltered => [...prevFiltered, newDeck]);

      return newDeck;

    }  catch (error) {
      console.error('デッキ作成失敗', error);
      setError('デッキの作成に失敗しました: ' + error.message);
      return null; // エラー時にはnullを返す
    }
  }, [])

  const setSearchTermAndFilter = useCallback((term) => {
    setSearchTerm(term);
  }, []);
  // ---- newDeck から移植 --- //

  const editDeck = useCallback(async (selectedDeck, checkedCards) => {
    setError(null);
    const deckId = selectedDeck.id
    try {
      const response = await axios.patch(`/decks/${deckId}`, {
        deck: {
          card_ids: checkedCards.map((card) => card.id)
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }}
      );
      console.log('Response:', {
        status: response.status,
        headers: response.headers,
        data: response.data
      });

      if (response.data) {
        updateDeckAndCard(response.data)

      }
      fetchDecks()
    } catch (error) {
      setError('デッキの更新に失敗しました: ' + error.message);
      console.error('Error updating deck:', error);
    }
  }, []);

  useEffect(() => {
    console.log("aa", selectedDeck)
  }, [selectedDeck])

  const updateDeckAndCard = (updatedDeck) => {
        setDecks(prevDecks => prevDecks.map(deck => deck.id === updatedDeck.id ? updatedDeck : deck));
        setFilteredDecks(prevFilteredDeck => prevFilteredDeck.map(deck => deck.id === updatedDeck.id ? editDeck : deck));
        setSelectedDeck(updatedDeck)
        // setDecks(prevDecks => prevDecks.cards.map(card => card.id === updatedDeck.card.id ? updatedDeck.card : card));
  }
  
  const deleteDeck = useCallback(async (deckId) => {
    setError(null);
    try {
      await api.delete(`/your_decks/${deckId}`);
      setDecks(prevDecks => prevDecks.filter(deck => deck.id !== deckId));
    } catch (error) {
      setError('デッキの削除に失敗しました: ' + error.message);
      console.error('Error deleting deck:', error);
    }
  }, []);

  const selectDeck = useCallback((deck) => {
    setSelectedDeck(prevDeck => prevDeck?.id === deck?.id ? null : deck);
  }, []);

  return {
    decks, setDecks,
    filteredDecks, setFilteredDecks,
    selectedDeck, setSelectedDeck,
    isDeckLoading, setIsDeckLoading,
    searchTerm, setSearchTerm,
    error, setError
    ,
    addDeck,
    editDeck,
    fetchDecks,
    setSearchTermAndFilter,
    reRenderDeckList,
    updateDeckAndCard
  };
};