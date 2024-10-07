import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { setupCSRFToken } from '../components/form/setupCSRFToken';

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
  
  // 絞り込み検索用
  const [filteredDecks, setFilteredDecks] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('');
  const [status, setStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [isDeckLoading, setIsDeckLoading] = useState(true);
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
  }, [fetchDecks])

  const reRenderDeckList = useCallback(() => {
    fetchDecks()
  }, [fetchDecks, filteredDecks])

  // デッキを絞り込み検索
  useEffect(() => {
    const searchTerms = searchTerm.toLowerCase().split(' ');
    const filtered = decks
      .filter(deck =>
        (searchTerms.every(term =>
          deck.name?.toLowerCase().includes(term)
        )) // ワード検索
        &&
        (selectedLanguage ? deck.language === selectedLanguage : true ) // 言語検索
        &&
        (selectedCategory ? deck.category === selectedCategory : true)  // カテゴリ検索
        &&
        (status ? deck.status === status : true) // 公開/非公開 検索
      )
      .sort((a, b) => a.name.localeCompare(b.name));
    setFilteredDecks(filtered);
  }, [decks, searchTerm, selectedLanguage, selectedCategory, status]);

  const processApiResponse = (response) => {
    return {
      ...response,
      cards: response.cards || []    
    };
  };

  const addDeck = useCallback(async (data) => {
    try {
      const response = await axios.post('/decks',
        { deck: data },
        { headers: {
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
        }
      });
      // 新しいデッキを既存のデッキリストに追加
      setDecks(prevDecks => [...prevDecks, newDeck]);
      
      const newDeck = processApiResponse(response.data);
      return newDeck;
  
    } catch (error) {
      console.error('デッキ作成失敗', error);
      setError('デッキの作成に失敗しました: ' + error.message);
      return null; // エラー時にはnullを返す
    }
  }, [setDecks, setError]);

  const setSearchTermAndFilter = useCallback((term) => {
    setSearchTerm(term);
  }, []);

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

  const updateDeckInfo = useCallback( async(deckId, data) => {
    try {
      const response = await axios.patch(`decks/${deckId}`, data);
      
      setDecks(prevDecks => {
        const newDecks = prevDecks.map(deck => deck.id === deckId 
                                        ? { 
                                            id: deckId, // id
                                            ...data, // name, caatgory, language
                                            user_id:deck.user_id, // user_id
                                            cards: deck.cards,
                                            status: deck.status,
                                            created_at: deck.created_at,
                                            updated_at: response.data?.updated_at || deck.updated_at
                                          }
                                        : deck );
        return newDecks;
      });
      // カードのみ更新しないようにする

    } catch (error) {
      console.error('デッキ更新エラー:', error);
    }
  }, [setFilteredDecks]);

  const updateDeckAndCard = (updatedDeck) => {
        setDecks(prevDecks => prevDecks.map(deck => deck.id === updatedDeck.id ? updatedDeck : deck));
        setFilteredDecks(prevFilteredDeck => prevFilteredDeck.map(deck => deck.id === updatedDeck.id ? editDeck : deck));
        setSelectedDeck(updatedDeck)
        // setDecks(prevDecks => prevDecks.cards.map(card => card.id === updatedDeck.card.id ? updatedDeck.card : card));
  }
  
  const deleteDeck = async (deckId, windowOpenFalse, resetCheckedCards) => {
    setupCSRFToken();
    try {
      const response = await axios.delete(`/destroy_your_deck/${deckId}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 204) {        
        setDecks(prevDecks => prevDecks.filter(deck => deck.id !== deckId));
        setSelectedDeck(prevSelectedDeck => prevSelectedDeck && prevSelectedDeck.id === deckId ? null : prevSelectedDeck);
        console.log('デッキの削除成功')
        
        // 成功時のみコールバックを実行
        if (windowOpenFalse && typeof windowOpenFalse === 'function') {
          windowOpenFalse();
        }
        if (resetCheckedCards && typeof resetCheckedCards === 'function') {
          resetCheckedCards()
        }
      }
    } catch (error) {
        console.error('デッキ削除失敗',error)
      }
  }

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
    updateDeckInfo,
    editDeck,
    deleteDeck,
    fetchDecks,
    setSearchTermAndFilter,
    setSelectedLanguage,
    setSelectedCategory,
    setStatus,
    reRenderDeckList,
    updateDeckAndCard
  };
};