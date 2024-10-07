// import React, { useEffect, useState } from 'react';
// import axios from 'axios'

// export const DeckCards = ({deckId}) => {
//   const {} = useDecks();
//   const [deck, setDeck] = useState(null);
//   const [cards, setCards] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     console.log(`deckId : ${deckId}`)
//     const fetchDeck = async() => {
//       try {
//         setLoading(true);
//         console.log("");
//         const response = await axios.get(`/decks/${deckId}.json`)
//         setDeck(response.deta.deck);
//         setCards(response.data.cards);
//         setError(null);
//       } catch (err) {
//         setError('デッキフェッチエラーが発生しています')
//         console.error('デッキフェッチエラー', err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchDeck()
//   }, [deckId])
  
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;
//   if (!deck) return <div>No deck found.</div>;

//   return (
//     <div>
//       <h1>{deck.name}</h1>
//       <ul>
//         {cards.map((card) => 
//           <li
//           key={card.id}a
//           >
//             {card.title}
//           </li>)}
//       </ul>
//     </div>
//   )
// };
