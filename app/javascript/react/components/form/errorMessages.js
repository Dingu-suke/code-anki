import React from 'react'

export const ErrorMessages = () => {
  
  const formatErrors = (errors) => {
    const fields = {
      title: 'タイトル',
      body: '問題文',
      answer: '解答コード'
    };
    
    const emptyFields = Object.entries(errors)
      .filter(([field, error]) => error.type === 'required')
      .map(([field]) => fields[field]);
      
    return emptyFields.length > 0 
      ? `${emptyFields.join('、')} が未入力です` 
      : null;
  };
  return { formatErrors }
}