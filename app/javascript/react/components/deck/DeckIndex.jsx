import React from 'react';
import DeckForm from '../Form/DeckForm';


const DeckFormContainer = () => {
  const handleSubmit = (formData) => {
    // ここでフォームデータを処理します（例：APIリクエストの送信）
    console.log(formData);
  };

  return (
    <DeckForm
      onSubmit={handleSubmit}
    />
  );
};

export default DeckFormContainer;