import React from "react";



import { createRoot } from "react-dom/client";
import MonacoEditor from "./components/Editor/MonacoEditor";
import MonacoModal from "./components/Editor/MonacoModal";
import TextBox from "./components/TextBox";
import { Answer } from "./components/card/AnswerCard";
import QuestionCard from "./components/card/QuiestionCard";

const Router = () => {

  document.addEventListener("DOMContentLoaded", () => {
    const monacoModalRoot = document.getElementById("monacoModal");
    const monacoEditorRoot = document.getElementById("monacoEditor");
    const monacoInsertRoot = document.getElementById("monacoInsert");

    const textBoxRoot = document.getElementById("textBox");
    
    const quiestionCardRoot = document.getElementById("questionCard");
    const answerCardRoot = document.getElementById("answeCard");
    
    if (monacoModalRoot) {
      createRoot(monacoModalRoot).render(<MonacoModal />);
    }
    
    if (monacoEditorRoot) {
      createRoot(monacoEditorRoot).render(<MonacoEditor />);
    }
    
    if (monacoInsertRoot) {
      createRoot(monacoInsertRoot).render(<MonacoInsert />);
    }
    
    if (textBoxRoot) {
      createRoot(textBoxRoot).render(<TextBox />);
    }
    
    if (quiestionCardRoot) {
      createRoot(quiestionCardRoot).render(<QuestionCard />);
    }
    
    if (answerCardRoot) {
      createRoot(answerCardRoot).render(<Answer />);
    }
  });
};
