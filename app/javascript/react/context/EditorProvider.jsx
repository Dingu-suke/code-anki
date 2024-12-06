import React from 'react';
import { useRef, useState } from "react";
import { EditorContext } from "./EditorContext";
import { useEditorMethod } from "../hooks/useEditorMethod";

export const EditorProvider = ({ 
                                  children,
                                  card,
                                  runUserCode,
                                  runAnswerCode,
                                  userIsLoading,
                                  answerIsLoading,
                                  userEditorRef,
                                  answerEditorRef,
                                  setCurrentCardId,
                                  editorHeight,
                                  diffEditorHeight,
                                  bluredCards,
                                  toggleBlur,
                                  toggleBlur2,
                                  isBlur 
                                          }) => {
  const editorState = useEditorMethod(
    card,
    runUserCode,
    runAnswerCode,
    userIsLoading,
    answerIsLoading,
    userEditorRef,
    answerEditorRef,
    setCurrentCardId,
    editorHeight,
    diffEditorHeight,
    bluredCards,
    toggleBlur,
    toggleBlur2,
    isBlur
  );
  
  return (
    <EditorContext.Provider value={editorState}>
      {children}
    </EditorContext.Provider>
  )
}