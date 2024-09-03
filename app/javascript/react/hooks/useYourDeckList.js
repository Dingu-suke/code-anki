import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

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
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);  

  const fetchDecks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/your_decks');
      setFilteredDecks(data);
      console.log("data", data) // ここでは常にデータが表示される
      // setDecks(data);
      setFilteredDecks(data)
      console.log(filteredDecks, "aaaa"); // ここは常に空配列が出力される
    } catch (error) {
      setError('デッキの取得に失敗しました: ' + error.message);
      console.error('Error fetching decks:', error);
    } finally {
      setIsLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchDecks()
  }, [fetchDecks])

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
  const addDeck = async (data) => {
    console.log('送信データ:', data);
    try {
      const response = await axios.post('/decks',
        { deck: data },
        { headers: {
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
        }
      });
      console.log('デッキ作成成功', response.data)
      console.log("reRenderYourDecks()")
      fetchDecks();

    }  catch (error) {
      if (error.response) {
         // サーバーからのレスポンスがある場合
        console.error('デッキ作成失敗エラー', error.response.data);
      } else if (error.request) {
         // リクエストは行われたがレスポンスがない場合
        console.error('ネットワークエラー', error.request)
      } else {
        // リクエストの設定時にエラーが発生した場合
        console.log('Error', error.message);
      }
      // ああ
    }
  }
  // ---- newDeck から移植 --- //

  const updateDeck = useCallback(async (updatedDeck) => {
    setError(null);
    try {
      const { data: returnedDeck } = await api.put(`/your_decks/${updatedDeck.id}`, updatedDeck);
      setDecks(prevDecks => prevDecks.map(deck => 
        deck.id === returnedDeck.id ? returnedDeck : deck
      ));
      return returnedDeck;
    } catch (error) {
      setError('デッキの更新に失敗しました: ' + error.message);
      console.error('Error updating deck:', error);
    }
  }, []);

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

  const setSearchTermAndFilter = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  return {
    decks,
    filteredDecks,
    selectedDeck,
    isLoading,
    error,
    searchTerm,
    addDeck,
    fetchDecks,
    updateDeck,
    deleteDeck,
    selectDeck,
    setSearchTermAndFilter
  };
};