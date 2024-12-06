import { useCallback, useEffect, useRef, useState } from "react";

export const useEditorMethod = (
  // 親からの props を引数としてうけとり、これをそのまま return する (コンテクストで使えるようにする)
  card,
  runUserCode,
  runAnswerCode,
  userIsLoading,
  answerIsLoading,
  userEditorRef,
  answerEditorRef,
  setCurrentCardId,
  editorHeight,
  bluredCards,
  toggleBlur,
  toggleBlur2,
  isBlur
) => {

  const diffEditorRef = useRef(null);
  const prevCardIdRef = useRef(null);
  const [userEditorContent,  setUserEditorContent]  = useState("");
  const userEditorContentMap = useRef(new Map());
  const [activeTab, setActiveTab] = useState('editor')
  
  useEffect(() => {
    if (prevCardIdRef.current !== card?.id) {
      // カードが変更された場合
      if (prevCardIdRef.current) {
        // 前のカードの内容を保存
        userEditorContentMap.current.set(prevCardIdRef.current, userEditorContent);
      }
      
      // 新しいカードの内容をロード（存在する場合）または空にする
      const newContent = userEditorContentMap.current.get(card?.id) || "";
      setUserEditorContent(newContent);
      
      prevCardIdRef.current = card?.id;
    }
  }, [card?.id, userEditorContent]);

  const handleUserEditorDidMount = (editor) => {
    userEditorRef.current = editor;
    setCurrentCardId(card?.id);
  };

  const handleAnswerEditorDidMount = (editor) => {
    answerEditorRef.current = editor;
  };

 // DiffEditor用の関数とuseEffect

  const handleDiffEditorDidMount = (editor) => {
    diffEditorRef.current = editor;
    const originalEditor = editor.getOriginalEditor();
    originalEditor.updateOptions({ readOnly: false });
  };

  const updateDiffEditor = useCallback(() => {
    if (diffEditorRef.current && userEditorRef.current) {
      const originalEditor = diffEditorRef.current.getOriginalEditor();
      originalEditor.setValue(userEditorRef.current.getValue() || "");
    }
  }, [userEditorRef]);

  useEffect(() => {
    if (userEditorContent) {
      updateDiffEditor();
    }
  }, [userEditorContent, updateDiffEditor]);


  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    if (tabName === 'diff') {
      updateDiffEditor();
    }
  };

  const handleUserEditorChange = (value) => {
    setUserEditorContent(value);
  };

  const pointToggleBlur = (cardId) => {
    if (toggleBlur) {
      toggleBlur(cardId)
    } else {
      toggleBlur(!isBlur)
    }
  }

  return {
    card,
    runUserCode,
    runAnswerCode,
    userIsLoading,
    answerIsLoading,
    userEditorRef,
    answerEditorRef,
    setCurrentCardId,
    editorHeight,
    bluredCards,
    toggleBlur,
    toggleBlur2,
    isBlur,
    
    userEditorContent,  setUserEditorContent,
    activeTab, setActiveTab,
    
    prevCardIdRef,
    userEditorContentMap,
    handleUserEditorDidMount,
    handleAnswerEditorDidMount,
    handleDiffEditorDidMount,
    updateDiffEditor,
    handleTabChange,
    handleUserEditorChange,
    pointToggleBlur
  }
}