import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { setupCSRFToken } from '../components/form/setupCSRFToken';
import { useToast } from '../components/toast/Toust';

const api = axios.create({
  baseURL: '/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export const useYourDeckList = (url) => {
  const [decks, setDecks] = useState([]);
  const [filteredDecks, setFilteredDecks] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [status, setStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [isDeckLoading, setIsDeckLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // トースト機能をインポート
  const { toast, showToast } = useToast();

  // url が / で始まっていないときは 自動的に追加
  const validateUrl = useCallback((urlToValidate) => {
    if (!urlToValidate || typeof urlToValidate !== 'string') {
      throw new Error('Invalid URL provided');
    }
    return urlToValidate.startsWith('/') ? urlToValidate : `/${urlToValidate}`;
  }, []);  
  
  
  const fetchDecks = useCallback(async () => {
    setIsDeckLoading(true);
    setError(null);
    try {
      const validatedUrl = validateUrl(url);
      const { data } = await api.get(validatedUrl);
      setDecks(data);
      setFilteredDecks(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message;
        setError(`デッキの取得に失敗しました: ${errorMessage}`);
        showToast(`デッキの取得に失敗しました: ${errorMessage}`, 'error');
      } else {
        setError('デッキの取得中に予期せぬエラーが発生しました');
        showToast('デッキの取得中に予期せぬエラーが発生しました', 'error');
      }
      console.error('Error fetching decks:', error);
    } finally {
      setIsDeckLoading(false);
    }
  }, [url, validateUrl]);

  useEffect(() => {
    fetchDecks(url)
  }, [fetchDecks])

  const reRenderDeckList = useCallback(() => {
    fetchDecks(url)
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
      const response = await axios.post('/your_decks',
        { deck: data },
        { headers: {
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
        }
      });
      // 新しいデッキを既存のデッキリストに追加
      const newDeck = processApiResponse(response.data);
      setDecks(prevDecks => [...prevDecks, newDeck]);
      showToast('デッキを作成しました');
      return newDeck;
  
    } catch (error) {
      console.error('デッキ作成失敗', error);
      setError('デッキの作成に失敗しました: ' + error.message);
      showToast('デッキの作成に失敗しました: ' + error.message, 'error');
      return null; // エラー時にはnullを返す
    }
  }, [setDecks, setError]);

  const setSearchTermAndFilter = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const updateDeckAndCard = (updatedDeck) => {
    setDecks(prevDecks => prevDecks.map(deck => deck.id === updatedDeck.id ? updatedDeck : deck));
    setFilteredDecks(prevFilteredDeck => prevFilteredDeck.map(deck => deck.id === updatedDeck.id ? editDeck : deck));
    setSelectedDeck(updatedDeck)
    // setDecks(prevDecks => prevDecks.cards.map(card => card.id === updatedDeck.card.id ? updatedDeck.card : card));
}

const editDeck = useCallback(async (selectedDeck, checkedCards) => {
  setError(null);
  const deckId = selectedDeck.id
  try {
    // カードの位置情報を含めたデータを作成
    const cardPositions = checkedCards.map((card, index) => ({
      card_id: card.id,
      position: index + 1
    }));

    const response = await axios.patch(`/decks/${deckId}/update_card_position`, {
      deck: {
        deck_cards: cardPositions
      }
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      }}
    );

    if (response.data) {
      updateDeckAndCard(response.data)
      showToast('デッキを更新しました');
    }
    fetchDecks()
  } catch (error) {
    setError('デッキの更新に失敗しました: ' + error.message);
    showToast('デッキの更新に失敗しました: ' + error.message, 'error');
    console.error('Error updating deck:', error);
  }
}, [fetchDecks, updateDeckAndCard, showToast]);
  
  const updateDeckInfo = useCallback(async(deckId, data) => {
    try {
      const response = await axios.patch(`decks/${deckId}`, data);
      
      setDecks(prevDecks => {
        const newDecks = prevDecks.map(deck => deck.id === deckId 
                                        ? { 
                                            id: deckId,
                                            ...data,
                                            user_id:deck.user_id,
                                            cards: deck.cards,
                                            status: deck.status,
                                            created_at: deck.created_at,
                                            updated_at: response.data?.updated_at || deck.updated_at
                                          }
                                        : deck );
        return newDecks;
      });
      showToast('デッキ情報を更新しました'); // 成功時のトースト
  
    } catch (error) {
      console.error('デッキ更新エラー:', error);
      showToast('デッキ情報の更新に失敗しました', 'error');
    }
  }, [setDecks, showToast]);
  
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
        showToast('デッキを削除しました'); // 成功時のトースト
        
        if (windowOpenFalse && typeof windowOpenFalse === 'function') {
          windowOpenFalse();
        }
        if (resetCheckedCards && typeof resetCheckedCards === 'function') {
          resetCheckedCards()
        }
      }
    } catch (error) {
      console.error('デッキ削除失敗',error);
      showToast('デッキの削除に失敗しました', 'error');
    }
  };

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
    toast,
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