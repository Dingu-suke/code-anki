import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { setupCSRFToken } from '../components/Form/setupCSRFToken';
import { CATEGORY } from '../components/RunCodeEditorDaisyUI/constants';

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

  // ---- newDeck から移植 ---
  const addDeck = useCallback(async (data) => {
    try {
      const response = await axios.post('/decks',
        { deck: data },
        { headers: {
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
        }
      });
      const newDeck = response.data; // APIレスポンスがそのままデッキオブジェクト

      // 新しいデッキを既存のデッキリストに追加
      setDecks(prevDecks => [...prevDecks, newDeck]);

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
          'Content-Type': 'application/jso§n',
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
      console.log("Server response:", response);
  
      // const updatedDeck = response.status === 204
      //   ? { id: deckId, ...data }
      //   : response.data || { id: deckId, ...data };
      const updatedDeck = response.status === 204
  ? (() => {
      console.log('Status is 204');
      return { id: deckId, ...data };
    })()
  : (() => {
      console.log('Status is not 204, using response.data or default');
      console.log("response.data", response.data)
      return response.data || { id: deckId, ...data };
    })();
  
      console.log("Updated deck:", updatedDeck);
  
      setDecks(prevDecks => {
        console.log("Previous decks:", prevDecks);
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
        console.log("New decks:", newDecks);
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
    updateDeckInfo,
    editDeck,
    fetchDecks,
    setSearchTermAndFilter,
    setSelectedLanguage,
    setSelectedCategory,
    setStatus,
    reRenderDeckList,
    updateDeckAndCard
  };
};